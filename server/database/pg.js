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


// -- Table: public.items

// -- DROP TABLE public.items;

// CREATE TABLE public.items
// (
//     vendor character varying(100) COLLATE pg_catalog."default",
//     vendorname character varying(100) COLLATE pg_catalog."default",
//     vendorcountry character varying(100) COLLATE pg_catalog."default",
//     vendorphoto character varying(100) COLLATE pg_catalog."default",
//     responsetime character varying(50) COLLATE pg_catalog."default",
//     productid integer NOT NULL,
//     productname character varying(100) COLLATE pg_catalog."default",
//     productdescription character varying(200) COLLATE pg_catalog."default",
//     policies character varying(250) COLLATE pg_catalog."default",
//     faq character varying(250) COLLATE pg_catalog."default"
// )

// TABLESPACE pg_default;

// ALTER TABLE public.items
//     OWNER to postgres;

// -- Index: index_id

// -- DROP INDEX public.index_id;

// CREATE INDEX index_id
//     ON public.items USING btree
//     (productid)
//     TABLESPACE pg_default;