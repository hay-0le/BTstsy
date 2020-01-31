const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const { Pool } = require('pg');

const dotenv = require('dotenv');
dotenv.config();


const connectionString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`

//SEED items TABLE
console.time('Items loaded into PG database')

const pool = new Pool({
  connectionString: connectionString
});


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



//SEED policies TABLE

let policies = [];

