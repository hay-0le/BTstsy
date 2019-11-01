# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage (API routes)

|CRUD API ENDPOINTS                      | DESCRIPTION                                                      |
|----------------------------------------|------------------------------------------------------------------
|GET      /api/description/:productId    | Retrieves product description at productId                       |
|GET      /api/description               | Retrieves all product descriptions from the database             |
|POST     /api/description               | Adds new product description into the database                   |
|PUT      /api/description/:productId    | Updates existing product description in the database at productId|
|DELETE   /api/description/:productId    | Deletes product description in the database at productId         |

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```