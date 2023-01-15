const fs = require('fs');
const puppeteer = require('puppeteer');
const ProductRepo = require('../repositories/product.repo');

class Scraper {    
    constructor(fileName){
        this.websites = this.readDataFromFile(fileName);
    }

    readDataFromFile(fileName){
        const data = [];
        try{
            let filePath = `./resources/${fileName}.json`;
            data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        catch(e){
            console.log(e);
        }        
        
        return data;
    }

    async scrapeWebsites(){
        for(const website of this.websites)
        {            
            this.browser = await this.launchPuppeteer();    
            this.page = await this.browser.newPage();
            
            await this.scrapeCategories(website).finally(async () => {
                await this.browser.close();
            })
        }        
    }

    async launchPuppeteer(){
        return await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
    }

    async scrapeCategories(website){
        for (const category of website.links){            
            await this.scrapePages(website, category);
        } 
    }

    async scrapePages(website, category){
        for(let i = 1; i <= category.pages; i++)
        {
            let url = i > 1 ? category.url + website.format.replace('{}',i) : category.url;
            url = url + category.filter.toString();

            await this.page.goto(url, {
                waitUntil: 'domcontentloaded'
            });

            await this.page.waitForSelector(website.container);
            await this.extractProductDetailsFromProductCard(website, category);
        }
    }

    async extractProductDetailsFromProductCard(website, category){
        const listItem = await this.page.$$(website.item);        
        for(const item of listItem)
        {            
            let name = item.$eval(website.name, prod => prod.textContent) || "";
            let price = item.$eval(website.price, prod => prod.textContent) || 0;
            let image = item.$eval(website.image, prod => prod.getAttribute('src')) || "";              

            await this.writeProductToDatabase(name, price, image, website, category);
        }
    }

    async writeProductToDatabase(name, price, image, website, category){        
        const product = await {
            Name: (await name).toString().trim(),
            Price: (await price).toString().trim(),
            Image: (await image).toString().trim(),
            Site: website.site,
            Category: category.category,
            Link: "none".toString(),
            Added: Date.now()
        };       

        let productRepo = new ProductRepo();
        await productRepo.writeProduct(product).then(() => {
            console.log(`${product.Name} Added`);
        })
        .catch((error) => {
            console.log(`Error writing ${product.Name}`);
        })        
    }    
}


module.exports = Scraper;