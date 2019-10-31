const ItemDetails = require('./index.js');

// eslint-disable-next-line func-names
const getOneItem = function (productId) {
  return ItemDetails.findOne({ productId });

};

const getAllItems = function () {
  console.log('hi')
  return ItemDetails.find();
}

const updateItem = function (productId, update) {
  const results = ItemDetails.updateOne(
    { productId },
    update,
    { upsert: false }
  )
  return results;// console.log('results: ', results);
}

module.exports = {
  getOneItem,
  getAllItems,
  updateItem,
};
