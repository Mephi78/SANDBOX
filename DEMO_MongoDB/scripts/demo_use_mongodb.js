// include module mongodb
const { MongoClient } = require('mongodb');

// asynchronous functions will run in background
async function run() {
  // CONNECTION STRING >>>>> edit to your needs <<<<<
  const URI = "mongodb://localhost:27017";
  const CLIENT = new MongoClient(URI);

  try {
    await CLIENT.connect();
    console.log('Connection established.');

    await listDatabases(CLIENT);
  } finally {
    console.log('Closing connection...');
    await CLIENT.close();
    console.log('Connection closed.');
  }
}

// lists all databases (collections) in your MongoDb
async function listDatabases(client) {
  const DB_LIST = await client.db().admin().listDatabases();
  console.log('Listing databases...');
  DB_LIST.databases.forEach(db => {
    // literal template
    console.log(` * ${db.name}`);
  });
}

run().catch(console.dir);