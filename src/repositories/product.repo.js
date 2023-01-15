const Product = require('../models/product.model');

class ProductRepo {

    constructor(){}

    async writeProduct(product){
        await new Product(product).save();
    }
}

module.exports = ProductRepo;