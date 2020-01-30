require('dotenv').config();
const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const { Pool } = require('pg');
const connectionString = 'postgressql://postgres:root@localhost:5432/itemsdb';

console.time('Items loaded into PG database')

// const pool = new Pool({
//   connectionString: connectionString
// });

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
})

pool.connect((err, client, done)=> {

  const pgStream = client.query(copyFrom('COPY items FROM STDIN CSV'));
  const fileStream = fs.createReadStream('./data.csv');

  fileStream.on('error', (error) => {
    console.log(`Error on fileStream: ${error}`)
  });

  pgStream.on('error', (error) => {
    console.log(`Error on stream: ${error}`)
  });

  pgStream.on('end',() => {
    console.log('Stream ended')
  });

  fileStream.pipe(pgStream);

  fileStream.on('end', () => {
    console.log(process.memoryUsage());
    console.log(`CSV imported`)
    console.timeEnd('Items loaded into PG database');
  })
})

