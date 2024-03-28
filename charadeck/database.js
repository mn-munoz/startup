const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}.sikchrr.mongodb.net`;
const client = new MongoClient(url);
const db = client.db('charadeck');

const userCollection = db.collection('user');
const deckCollection = db.collection('deck');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

function getUser(user) {
    return userCollection.findOne({ user: user });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
  }

function addDeck(deck) {
    deckCollection.insertOne(deck);
}

function getDeck (deck) {
    deckCollection.insertOne(deck);
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addDeck,
    getDeck,
};