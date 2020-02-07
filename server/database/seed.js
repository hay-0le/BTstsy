//FILE SUMMARY: Produces policy, and product information objects and populates them into a CSV file

  //Implement writeStream and "Drain" event
    //The drain event is invoked in times when the writable stream's internal buffer size has exceeded its max
  //normalization: Legacy code had policies as part of the product object initially. Information was repeated, so pulled it out into a separate table


const fs = require('fs');
const faker = require('faker');
const { Parser } = require('json2csv');


//create array of policy objects
let policies = [];

//Creates objects with policy information
let i = 10;
let createPolicies = () => {
  do {
    console.log("i", i)
    let policy = {
      policyid: i,
      shippingpolicy: faker.lorem.paragraph().slice(0, 170),
      returnpolicy: faker.lorem.paragraph().slice(0, 170),
      additionalpolicy: faker.lorem.paragraph().slice(0, 170),
    }

    policies.push(policy);
    i--;

  } while (i >= 0)

}
createPolicies();


//Generate a csv file and populate it with 10,000,000 product objects
const writeStream = fs.createWriteStream('data.csv');

console.time('10,000,000 docs loaded');

function csvLoader(writer, encoding, cb) {
  let i = 50;

  function seed() {
    let ok = true;

    //loop: continue creating, and adding writing item to CSV, until writer.write() returns an error (held in variable 'ok') or on final product (i = 0)
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
        policyid: Math.floor(Math.random() * i),
        faq: JSON.stringify([{question: faker.lorem.sentence().slice(0, 20)}, {answer: faker.lorem.sentence().slice(0,60)}])
      }
      console.log("item", item)
      //Data structure will be the same coming out as going in, so remove headers (ie. productid, vendor, etc)
      let parser = new Parser({header: false});
      const csvDetails = parser.parse(item);

      i -= 1;

      if (i === 0) {
        //Logs time and heap information to console
        console.log(process.memoryUsage());
        console.log('done loading csv data')
        console.timeEnd('10,000,000 docs loaded');

        writer.write(csvDetails, encoding, cb)
      } else {
        //
        ok = writer.write(csvDetails + '\n', encoding)
      }

    } while ( i > 0 && ok);

    //if writer.write() has produced error and jumped out of loop (and still not on the final product), drain the stream's internal buffer, then continue (by calling "seed" function) loop
    if (i > 0) {

      writer.once('drain', seed)
    }
  }
  seed();
}

//invoke entire function
csvLoader(writeStream, 'utf-8', () => {
  writeStream.end();
})



module.exports = {
  policies: policies
}