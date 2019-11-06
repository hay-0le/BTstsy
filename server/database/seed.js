
const fs = require('fs');
const faker = require('faker');
const { Parser } = require('json2csv');
// const csv = require('csvtojson');

const { ItemDetails } = require('./index.js');
const { db } = require('./index.js');


const writeStream = fs.createWriteStream('data.csv');

console.time('10,000,000 docs loaded');
function csvLoader(writer, encoding, cb) {
  let i = 10000000;

  function seed() {
    let ok = true;

    do {

      let item = {
        'vendorName': faker.company.companyName(),
        'vendorFirstName': faker.name.firstName(),
        'vendorCountry': faker.address.country(),
        'returnsAndExchange': faker.lorem.paragraph().slice(0, 198),
        'shippingPolicies': faker.lorem.paragraph().slice(0, 198),
        'additionalPolicies': faker.lorem.paragraph().slice(0, 198),
        'question': faker.lorem.sentence().slice(0, 99),
        'answer': faker.lorem.sentence().slice(0,99),
        'vendorPhoto': 'https://loremflickr.com/320/240/dog',
        'vendorReponseTime': Math.floor(Math.random()* 30) + ' days',
        'productId': i,
        'productName': faker.commerce.productName(),
        'productDescription': faker.lorem.sentences().slice(0, 99)
        }
      let parser = undefined;

      if (i === 10000000) {
        parser = new Parser({header: false, flatten: true})

      } else {
        parser = new Parser({header: false, flatten: true});
      }

      const csvDetails = parser.parse(item);

      i -= 1;

      if (i === 0) {
        console.log(process.memoryUsage());
        console.log('done loading csv data')
        console.timeEnd('10,000,000 docs loaded');
        writer.write(csvDetails, encoding, cb)
      } else {
        ok = writer.write(csvDetails + '\n', encoding)
      }

    } while ( i > 0 && ok);

    if (i > 0) {

      writer.once('drain', seed)
    }
  }
  seed();

}
csvLoader(writeStream, 'utf-8', () => {
  writeStream.end();
})




