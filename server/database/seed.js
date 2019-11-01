/* eslint-disable no-console */
/* eslint-disable func-names */
const seedData = require('./SeedData.json');
const { ItemDetails } = require('./index.js');
const faker = require('faker');
const mongoose = require('mongoose');
const { db } = require('./index.js');



// const onInsert = function (err, docs) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.info('%d item details were successfully stored.', docs.length);
//   }
// };
// ItemDetails.insertMany(seedData, onInsert);

const newItem = function (num) {
  this.vendorName = faker.company.companyName(),
  this.vendorFirstName = faker.name.firstName(),
  this.vendorCountry = faker.address.country(),
  this.shopPolicies = {
    returnsAndExchange: faker.lorem.paragraph(),
    shippingPolicies: faker.lorem.paragraph(),
    additionalPolicies: faker.lorem.paragraph()
  },
  this.faq = [
    {question: faker.lorem.sentence(),
    answer: faker.lorem.sentence() }
  ],
  this.vendorPhoto = `https://picsum.photos/id/${Math.floor(Math.random()*200)}/200/300`,
  this.vendorReponseTime = Math.floor(Math.random()* 30) + ' days',
  this.productId = num ,
  this.product = {productName: faker.commerce.productName(),
      productDescription: faker.lorem.sentences()}
}

db.dropDatabase();

for (var i = 0; i < 100; i++) {
  const item = new newItem(i);

  const details = new ItemDetails(item);
  details.save((err, results) => {
    if (err) {
      console.log("Error: ", err)
    }
  })
}
console.log('Loaded items')

module.exports = {

}