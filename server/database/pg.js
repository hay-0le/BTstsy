const { Client } = require('pg');
const connectionString = 'postgressql://postgres:root@localhost:5432/itemsdb';

const client = new Client({
  connectionString: connectionString
})

async function seed () {
  try {

    await client.connect();
    await client.query('BEGIN')
    // await client.query('insert into')
    console.log('seeding')
    await

    await client.query('COMMIT')
  } catch(err) {
    console.log('Error seeing postgres: ', err)
  } finally {
    await client.end()
    console.log('Client disconnected.')
  }
}

seed();