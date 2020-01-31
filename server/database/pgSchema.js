const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const connectionString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`

const pool = new Pool({
  connectionString: connectionString
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
  const createPolicyTable =
    `CREATE TABLE IF NOT EXISTS
      policies(
        policyid integer CONSTRAINT policy_pkey PRIMARY KEY (policyid),
        shippingpolicy character varying(200),
        returnpolicy character varying(200),
       additionalpolicy character varying(200)
    );

//     CREATE TABLE IF NOT EXISTS
//       items(
//         productid integer CONSTRAINT product_pkey PRIMARY KEY (productid),
//         vendor character varying(100),
//         vendorname character varying(100),
//         vendorcountry character varying(100),
//         vendorphoto character varying(100),
//         responsetime character varying(50),
//         productname character varying(100),
//         productdescription character varying(200),
//         policyid integer NOT NULL,
//         faq character varying(250)
// )`;

  pool.query(createPolicyTable)
    .then((res) => {
      console.log(res);
      console.log("success")
      pool.end();
    })
    .catch((err) => {
      console.log("ERROR creating items table:", err);
      pool.end();
    });

//     const createItemsTable =
//     `CREATE TABLE IF NOT EXISTS
//       items(
//         productid integer CONSTRAINT product_pkey PRIMARY KEY (productid),
//         vendor character varying(100),
//         vendorname character varying(100),
//         vendorcountry character varying(100),
//         vendorphoto character varying(100),
//         responsetime character varying(50),
//         productname character varying(100),
//         productdescription character varying(200),
//         policyid integer NOT NULL,
//         faq character varying(250)
// );`;

//   pool.query(createItemsTable)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log("ERROR creating items table:", err);
//       pool.end();
//     });
}
createTables();
// /**
// --  * Drop Tables
// --  */
// -- const dropTables = () => {
// --   const queryText = 'DROP TABLE IF EXISTS reflections';
// --   pool.query(queryText)
// --     .then((res) => {
// --       console.log(res);
// --       pool.end();
// --     })
// --     .catch((err) => {
// --       console.log(err);
// --       pool.end();
// --     });
// -- }

// -- pool.on('remove', () => {
// --   console.log('client removed');
// --   process.exit(0);
// -- });



















// -- SET statement_timeout = 0;
// -- SET lock_timeout = 0;
// -- SET idle_in_transaction_session_timeout = 0;
// -- SET client_encoding = 'UTF8';
// -- SET standard_conforming_strings = on;
// -- SELECT pg_catalog.set_config('search_path', '', false);
// -- SET check_function_bodies = false;
// -- SET xmloption = content;
// -- SET client_min_messages = warning;
// -- SET row_security = off;

// -- ------ If table already exists, drop, then create items

// -- -- DROP TABLE public.items;

// -- CREATE SCHEMA public;


// -- ALTER SCHEMA public OWNER TO postgres;

// -- DROP TABLE public.items;
// -- DROP TABLE public.policies;

// -- CREATE TABLE public.items
// -- (
// --     productid integer NOT NULL,
// --     vendor character varying(100) COLLATE pg_catalog."default",
// --     vendorname character varying(100) COLLATE pg_catalog."default",
// --     vendorcountry character varying(100) COLLATE pg_catalog."default",
// --     vendorphoto character varying(100) COLLATE pg_catalog."default",
// --     responsetime character varying(50) COLLATE pg_catalog."default",
// --     productname character varying(100) COLLATE pg_catalog."default",
// --     productdescription character varying(200) COLLATE pg_catalog."default",
// --     policyid integer NOT NULL,
// --     faq character varying(250) COLLATE pg_catalog."default"
// -- );

// -- ALTER TABLE public.items OWNER TO postgres;



// -- CREATE TABLE public.policies
// -- (
// --   policyid integer NOT NULL,
// --   shippingpolicy character varying(200) COLLATE pg_catalog."default",
// --   returnpolicy character varying(200) COLLATE pg_catalog."default",
// --   additionalpolicy character varying(200) COLLATE pg_catalog."default"

// -- );

// -- ALTER TABLE public.policies
// --     OWNER to postgres;

// -- ALTER TABLE public.items
// --     ADD CONSTRAINT product_pkey PRIMARY KEY (productid);

// -- 	ALTER TABLE public.policies
// --     ADD CONSTRAINT policy_pkey PRIMARY KEY (policyid);




// ------- drop index on product id
// -- DROP INDEX public.index_id;



// ------ remove dupllicates of keys
// -- DELETE FROM items a USING (
// --   SELECT MIN(ctid) as ctid, productid
// --     FROM items
// --     GROUP BY productid HAVING COUNT(*) > 1
// --   ) b
// --   WHERE a.productid = b.productid
// --   AND a.ctid <> b.ctid

// ----------insert data
// -- INSERT INTO items(
// --     vendor,
// --     vendorname,
// --     vendorcountry,
// --     vendorphoto,
// --     responsetime,
// --     productname,
// --     productdescription,
// --     policyid,
// --     faq)
// -- VALUES
// --    ("mexesea", "dane", "USA", "url", "10 minutes", "Magic wandsss", "Magicy wands", 1, "fdjsaklfdjsalfjdsla");



// --    INSERT INTO policies (
// --    policyid,
// --    shippingpolicy,
// --    returnpolicy,
// --    additionalpolicy)
// -- VALUES
// --    (1, "fdjsalfjdsafSHIPPINGGGGG", "RETURNINGGGFFJDKSALFLDSA", "ADDITIONALLLLLLSTUFF" );

// --

// ---------INNER JOIN
// -- SELECT * FROM items INNER JOIN policies ON policies.policyid = items.policyid;
