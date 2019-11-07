require('dotenv').config();

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgressql://postgres:root@localhost:5432/itemsdb',
    migrations: {
        directory: __dirname + '/migrations'
    },
    seeds: {
        directory: __dirname + '/seeds/test'
    }
},
};