<h1 align="center"> PC Part Hunter Scraper </h1>

<p align="center">

  Web scraping service for PC Part Hunter

</p>
## Table of Contents
- [Introduction](#introduction)
- [Requirements](#requirements)
    - [Dependencies](#Dependencies)
- [Quick Start](#quick-start)
    - [Run Docker](#Docker)
    - [Run Locally With Node](#Node)

## Introduction
Welcome to the PC Part Hunter Scraper, this service forms part of the [PC Part Hunter](https://www.github.com) system.

The service collects information about products from the different PC part websites and stores the unedited data in a database. The service runs using GitHub Actions cron jobs about every hour and once the job is complete, the data filtering service will be triggered.

## Requirements
The service can be run locally using [Docker](#Docker) or [Node](#Node)

#### Dependencies
- [Axios]()
- [CORS]()
- [dotenv]()
- [Express]()
- [Mongoose]()
- [Nodemon]()
- [Puppeteer]()

#### Exteral Services
- [MongoDB]()

## Quick Start

#### Docker
Running service on docker
1. Build the docker image
``` shell

docker build -t part-hunter-scraper

```

2. Run the docker image
``` shell

docker run part-hunter-scraper

```

#### Node
Running the service on a local instance of Node. You may encounter issues if you are running a version of Node other than v16

1. Install the application dependencies (may take a while, Puppeteer is a big boi)
``` shell

npm install

```

2. Run the application using nodemon
``` shell

npm run start

```

#### Environment Vairables
You will need to setup up the following environment variables for both Docker and Node

- MONGO_DB=[your-mongodb-database-connection]