const ItemDetails = require('./index.js');

// eslint-disable-next-line func-names
const getOneItem = function (productId) {
  return ItemDetails.findOne({ productId });

};

module.exports = {
  getOneItem,
};
