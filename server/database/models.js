const { ItemDetails } = require('./index.js');

// eslint-disable-next-line func-names
const getOneItem = function (productId) {
  return ItemDetails.findOne({ productId });
};

// var getOneItem = async function() {
//   const itemDetails = await itemDetails.findOne({vendorLocation: "California"});
//   return itemDetails;
// }
module.exports = {
  getOneItem,
};
