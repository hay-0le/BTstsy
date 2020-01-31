# BTetsy

> Rebuild the back-end of a legacy codebase

## Related Projects

-https://github.com/SDC-PepperJack/Pepperjack-carousel-darjama
-https://github.com/SDC-PepperJack/Pepperjack-checkout-service
-https://github.com/SDC-PepperJack/Pepperjack-reviews-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage (API routes)
To render different items in the browser: http:localhost:{ port }/?{ id# 1 - 10M }

|CRUD API ENDPOINTS                          | DESCRIPTION                                                          |
|--------------------------------------------|-----------------------------------------------------------------------
|GET      /api/description/:productId        | Retrieves product description at productId                           |
|~~GET      /api/description~~               | ~~Retrieves all product descriptions from the database~~             |
|~~POST     /api/description~~               | ~~Adds new product description into the database~~                   |
|~~PUT      /api/description/:productId~~    | ~~Updates existing product description in the database at productId~~|
|~~DELETE   /api/description/:productId~~    | ~~Deletes product description in the database at productId~~         |

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

### Installing Dependencies
From within the root directory:

```sh
npm install -g webpack
npm install
```

## Creating Database
1. Create tables in PG database
2. Seed CSV file with 10M items
3. Seed items from CSV into database

```sh
npm run build-schema
npm run seed-csv
npm run seed-db
```

## Development
1. Start server
2. Bundle application with webpack
```sh
npm start
npm run build
```
