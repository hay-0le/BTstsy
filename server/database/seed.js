
const mongoose = require('mongoose');
const fs = require('fs');
const faker = require('faker');
const { Parser } = require('json2csv');
const csv = require('csvtojson');
const papa = require('papaparse');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const { ItemDetails } = require('./index.js');
const { db } = require('./index.js');

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

// db.dropDatabase();
// const docs = [];

const dataToCSV = () => {
  writer.pipe(fs.createWriteStream('data.csv', { encoding: 'utf8' }));

  for (var i = 0; i < 1; i++) {
    const item = new newItem(i);
    const details = new ItemDetails(item);
    console.log(details)

    const fields = ["vendorName", "vendorFirstName", "vendorCountry", "shopPolicies.returnsAndExchange", "shopPolicies.shippingPolicies", "shopPolicies.additionalPolicies", "faq.question", "faq.answer", "vendorPhoto", "vendorReponseTime", "productId", "product.productName", "product.productDescription"]
    const parser = new Parser({ fields });
    const csvDetails = parser.parse([details])
  //   csv({
  //     noheader:true,
  //     output: "csv"
  // })
  // .fromString(csvDetails)
  // .then((csvRow)=>{
  //     console.log(csvRow) "9"]]
  // })
     writer.write(csvDetails);
  }
  writer.end();
  console.log('Data generated to csv')
}
dataToCSV();
// console.time('10M docs loaded');
// for (var j = 0; j < docs.length; j+= 100) {

//   ItemDetails.insertMany(docs.slice(j, j + 100))
// }
// console.timeEnd('10M docs loaded');
