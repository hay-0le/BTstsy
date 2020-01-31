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


const createTables = () => {
  const createPolicyTable =
    `CREATE TABLE IF NOT EXISTS
      policies(
        policyid integer,
        shippingpolicy character varying(200),
        returnpolicy character varying(200),
       additionalpolicy character varying(200),
       CONSTRAINT policy_pk PRIMARY KEY (policyid)
    );

     CREATE TABLE IF NOT EXISTS
       items(
         productid integer,
         vendor character varying(100),
         vendorname character varying(100),
         vendorcountry character varying(100),
         vendorphoto character varying(100),
         responsetime character varying(50),
         productname character varying(100),
         productdescription character varying(200),
         policyid integer NOT NULL,
         faq character varying(250),
         CONSTRAINT product_pk PRIMARY KEY (productid)
 )`;

  pool.query(createPolicyTable)
    .then((res) => {
      console.log(res);
      console.log("success")
      pool.end();
    })
    .catch((err) => {
      console.log("ERROR creating tables:", err);
      pool.end();
    });

}
createTables();







//Query string if needed for testing in pgAdmin


// -- DROP TABLE public.items;
// -- DROP TABLE public.policies;


// -- ALTER TABLE public.items OWNER TO postgres;


// -- ALTER TABLE public.policies
// --     OWNER to postgres;


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
