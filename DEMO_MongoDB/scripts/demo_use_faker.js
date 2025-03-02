// include modules
const { faker } = require('@faker-js/faker');
// curly braces mean, you initialize an Object
const { MongoClient } = require('mongodb');

async function seedDb() {
  // CONNECTION STRING >>>>> edit to your needs <<<<<
  const URI = "mongodb://localhost:27017";
  const CLIENT = new MongoClient(URI);

  try {
    await CLIENT.connect();
    console.log('Connection established.');

    const DB = CLIENT.db('FakerTest');    // use database FakerTest
    const BOOKS = DB.collection('books');
    //clear collection books before seeding
    BOOKS.drop();

    // create some fake books data
    let bookList = [];

    // get random book objects
    for (let i = 0; i < 10; i++) {
      let newBook = {
        encounter: faker.date.past(),
        author: faker.person.fullName(),
        title: faker.book.title(),        // JS allows trailing commas in arrays, Objects, function parameters...
      };
      bookList.push(newBook);
    }
    await BOOKS.insertMany(bookList);
    console.log('Books collection seeded.')
  } finally {
    await CLIENT.close();
    console.log('Database connection closed.')
  }
}

seedDb().catch(console.dir);