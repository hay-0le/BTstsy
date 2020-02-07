//FILE SUMMARY: Transfer data from CSV to database

const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const { Pool } = require('pg');
const { policies } = require('./seed.js');

const dotenv = require('dotenv');
dotenv.config();


const connectionString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`


console.time('Items loaded into PG database')

const pool = new Pool({
  connectionString: connectionString
});


pool.connect((err, client, done)=> {
  //Create a read and write streams
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

  //"pipe" data from fileStream to pgStream
  fileStream.pipe(pgStream);

  fileStream.on('end', () => {
    console.log(process.memoryUsage());
    console.log(`CSV imported`)
    console.timeEnd('Items loaded into PG database');
  })
})

  for (let policy of policies) {
    let queryString = `INSERT INTO policies
      (
        policyid,
        shippingpolicy,
        returnpolicy,
        additionalpolicy
      )
      VALUES ($1, $2, $3, $4)`


    pool.query(queryString, [policy.policyid, policy.shippingpolicy, policy.returnpolicy, policy.additionalpolicy])
      .then((res) => {
        console.log("Success loading policies into db")
      })
      .catch(err => {
        console.log("ERROR loading policies into db: ". err);
      })



  }






