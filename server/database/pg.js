const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const { Pool } = require('pg');
const connectionString = 'postgressql://postgres:root@localhost:5432/itemsdb';

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

  fileStream.pipe(stream);

  fileStream.on('end', () => {
    console.log(process.memoryUsage());
    console.log(`CSV imported`)
    console.timeEnd('Items loaded into PG database');
  })
})
                    //   CREATE TABLE items (
                    //     vendorName VARCHAR, vendorFirstName VARCHAR, vendorCountry VARCHAR, shopPolicies VARCHAR, faq VARCHAR, vendorPhoto VARCHAR, vendorResponseTime VARCHAR, productId INT PRIMARY KEY, product VARCHAR);
                    // `