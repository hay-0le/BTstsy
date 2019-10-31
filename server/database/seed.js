/* eslint-disable no-console */
/* eslint-disable func-names */
const seedData = require('./SeedData.json');
const ItemDetails = require('./index.js');

const onInsert = function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    console.info('%d item details were successfully stored.', docs.length);
  }
};
ItemDetails.insertMany(seedData, onInsert);
