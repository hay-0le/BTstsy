// const { ItemDetails } = require('../database/index.js');
const { Pool } = require('pg');
const connectionString = 'postgressql://postgres:root@localhost:5432/itemsdb';

const pool = new Pool({
  connectionString: connectionString
});

// eslint-disable-next-line func-names
const getOneItem = (req, res) => {
  const id = req.params.productId;

  console.time(`Query for item #${id}`);
  pool.query('SELECT * FROM items WHERE productid = $1',  [id], (err, results) => {
    if (err) {
      console.log("Pool query error: ", err)
    }
    res.status(200).json(results.rows)
    console.timeEnd(`Query for item #${id}`);
  })
}

const getAllItems = function () {
  return ItemDetails.find()
  .catch(err => {
    console.log(err)
  });
}

const updateItem = function (productId, update) {
  const results = ItemDetails.updateOne(
    { productId },
    update,
    { upsert: false }
  )
  return results;// console.log('results: ', results);
}

const deleteItem = function (productId) {
  const result = ItemDetails.deleteOne({ productId });
  return result;
}

module.exports = {
  getOneItem,
  getAllItems,
  updateItem,
  deleteItem,
};
