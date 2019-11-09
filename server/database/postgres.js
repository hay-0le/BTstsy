const { Pool, Client } = require('pg');
const connectionString = 'postgressql://postgres:root@localhost:5432/itemsdb';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'itemsdb',
  password: 'root',
  port: 5432
});

pool.query('SELECT NOW()', (err, res) => {
  console.log('pool query working')
  //dont call pool end after query completes, reserve that for when app termiinates or it will dispose of all open client instances
  pool.end();
})

const client = new Client({
  connectionString: connectionString
})

client.connect()
  .then(() => {
    console.log('Client connected successfully');
  })
  .then(() => {
    console.log('hey')
  })
  .catch((err) => {
    console.error('Error: ', err);
  })
  .finally(() => {
    client.end();
  })

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// })