// const { ItemDetails } = require('../database/index.js');

// // eslint-disable-next-line func-names
// const getOneItem = function (productId) {
//   console.log("In get one item")
//   return ItemDetails.findOne({ productId });

// };

// const getAllItems = function () {
//   return ItemDetails.find();
// }

// const updateItem = function (productId, update) {
//   const results = ItemDetails.updateOne(
//     { productId },
//     update,
//     { upsert: false }
//   )
//   return results;// console.log('results: ', results);
// }

// const deleteItem = function (productId) {
//   const result = ItemDetails.deleteOne({ productId });
//   return result;
// }

// module.exports = {
//   getOneItem,
//   getAllItems,
//   updateItem,
//   deleteItem,
// };



// const { ItemDetails } = require('../database/index.js');
const { Pool } = require('pg');
const connectionString = 'postgressql://postgres:root@localhost:5432/itemsdb';

const pool = new Pool({
  connectionString: connectionString
});

const getOneItem = (req, res) => {
  const id = req.params.productId;

  console.time(`Query for item #${id}`);
  pool.query('SELECT * FROM items WHERE productid = $1',  [id], (err, results) => {
    if (err) {
      res.status(404).send('Pool query error retrieving item: ', err)
    }
    res.status(200).json(results.rows)
    console.timeEnd(`Query for item #${id}`);
  })
}

//Retrieve all items
const getAllItems = (req, res) => {

  console.time('Retrieved all items from database')
  pool.query("SELECT * FROM items WHERE productid<3000000", (err, results) => {
    if (err) {
      res.status(404).send('Pool query error retrieving all items: ', err)
    }
    res.status(200).json(results.rows)
    console.timeEnd('Retrieved all items from database')
  })
}

const addItem = (req, res) => {
  const item = req.body;

  console.time('Added item to database');
  pool.query('INSERT INTO items (vendor, vendorname, vendorcountry, vendorphoto, responsetime, productid, productname, productdescription, policies, faq) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [item.vendor, item.vendorname, item.vendorcountry, item.vendorphoto, item.responsetime, item.productid, item.productname, item.productdescription, item.policies, item.faq], (err) => {
    if (err) {
      // res.status(422);
      res.status(404).send(err);
      console.log(err)
    } else {
      res.send("Item successfully added");
      console.timeEnd('Added item to database');
    }
  })

}

//Update one item
const updateItem = (req, res)=> {
  const productId = req.params.productId;
  const update = req.body.update;

    pool.query(`UPDATE items SET responsetime = $1 WHERE productid = $2`, [update + " days", productId], (err, results) => {
      if (err) {
        res.status(404).send('Pool query error updating item: ', err)
      }
      res.status(200).send('Successfully updated item')
    })
}

//Delete one item
const deleteItem = (req, res) => {
  const id = req.params.productId;

  pool.query('DELETE FROM items WHERE productid = $1',  [id], (err, results) => {
    if (err) {
      res.status(404).send('Pool query error deleting item: ', err)
    }
    res.status(200).json(results)

  })
}

module.exports = {
  getOneItem,
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
};

