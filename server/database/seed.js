
const fs = require('fs');
const faker = require('faker');
const { Parser } = require('json2csv');
// const csv = require('csvtojson');

const writeStream = fs.createWriteStream('data.csv');

console.time('10,000,000 docs loaded');

function csvLoader(writer, encoding, cb) {
  let i = 10000000;

  function seed() {
    let ok = true;

    do {
      let item = {
        vendorName: faker.company.companyName(),
        vendorFirstName: faker.name.firstName(),
        vendorCountry: faker.address.country(),
        vendorPhoto: 'https://loremflickr.com/320/240/dog',
        vendorResponseTime: Math.floor(Math.random()* 30) + ' days',
        productId: i,
        productName: faker.commerce.productName(),
        productDescription: faker.lorem.sentences().slice(0, 99),
        policies : JSON.stringify([{shippingpolicy: faker.lorem.paragraph().slice(0, 70)}, {returnpolicy: faker.lorem.paragraph().slice(0, 40)}, {additionalpolicies: faker.lorem.paragraph().slice(0, 60)}]),

        faq: JSON.stringify([{question: faker.lorem.sentence().slice(0, 30)}, {answer: faker.lorem.sentence().slice(0,30)}])
      }

      let parser = new Parser({header: false});

      // if (i === 10000000) {
      //   parser = new Parser({header: false, flatten: true})

      // } else {
      //   parser = new Parser({header: false, flatten: true});
      // }

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
