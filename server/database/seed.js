
const fs = require('fs');
const faker = require('faker');
const { Parser } = require('json2csv');
// const csv = require('csvtojson');

const { ItemDetails } = require('./index.js');
const { db } = require('./index.js');


const writeStream = fs.createWriteStream('data.csv');

console.time('10,000,000 docs loaded');
function csvLoader(writer, encoding, cb) {
  let i = 10;

  function seed() {
    let ok = true;

    do {

      let item = {
        'vendorName': faker.company.companyName(),
        'vendorFirstName': faker.name.firstName(),
        'vendorCountry': faker.address.country(),
        'shopPolicies': {
          'returnsAndExchange': faker.lorem.paragraph(),
          'shippingPolicies': faker.lorem.paragraph(),
          'additionalPolicies': faker.lorem.paragraph()
        },
        'faq': [
          {'question': faker.lorem.sentence(),
          'answer': faker.lorem.sentence() }
        ],
        'vendorPhoto': 'https://loremflickr.com/320/240/dog',
        'vendorReponseTime': Math.floor(Math.random()* 30) + ' days',
        'productId': i,
        'product': {'productName': faker.commerce.productName(),
            'productDescription': faker.lorem.sentences()}
        }
      let parser = undefined;

      if (i === 10) {
        parser = new Parser({header: true, flatten: true})
      } else {
        parser = new Parser({header: false, flatten: true});
      }

      const csvDetails = parser.parse(item);

      i -= 1;

      if (i === 0) {
        writer.write(csvDetails, encoding, cb)
      } else {
        ok = writer.write(csvDetails, encoding)
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
  console.log(process.memoryUsage());
  console.log('done loading csv data')
  console.timeEnd('10,000,000 docs loaded');
})



