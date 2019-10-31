const ItemDetails = require('./index.js');

// eslint-disable-next-line func-names
const getOneItem = function (productId) {
  return ItemDetails.findOne({ productId });

};

const getAllItems = function () {
  console.log('hi')
  return ItemDetails.find();
}

module.exports = {
  getOneItem,
  getAllItems,
};
