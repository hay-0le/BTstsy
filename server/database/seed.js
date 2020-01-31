
const fs = require('fs');
const faker = require('faker');
const { Parser } = require('json2csv');


//create array of policy objects
let policies = [];

let createPolicies = () => {
  let i = 10;

  do {
    //create random policies object
    let policy = {
      policyid: i,
      shippingpolicy: faker.lorem.paragraph().slice(0, 170),
      returnpolicy: faker.lorem.paragraph().slice(0, 170),
      additionalpolicy: faker.lorem.paragraph().slice(0, 170),
    }

    policies.push(policy);
    i--;

  } while (i <= 0)

}
createPolicies();


//Seed items from csv into pgdb
const writeStream = fs.createWriteStream('data.csv');

console.time('10,000,000 docs loaded');

function csvLoader(writer, encoding, cb) {
  let i = 100;

  function seed() {
    let ok = true;

    do {
      let item = {
        productid: i,
        vendor: faker.company.companyName(),
        vendorname: faker.name.firstName(),
        vendorcountry: faker.address.country(),
        vendorphoto: 'https://loremflickr.com/320/240/dog',
        responsetime: Math.floor(Math.random()* 30) + ' days',

        productname: faker.commerce.productName(),
        productdescription: faker.lorem.paragraph().slice(0, 170),
        policyid: Math.floor(Math.random() * policies.length),
        faq: JSON.stringify([{question: faker.lorem.sentence().slice(0, 20)}, {answer: faker.lorem.sentence().slice(0,60)}])
      }

      let parser = new Parser({header: false});

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



module.exports = {
  policies: policies
}