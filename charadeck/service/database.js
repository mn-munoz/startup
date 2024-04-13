const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
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

async function createUser(userName, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      user: userName,
      pswd: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
  }


// Have to look how that will be like but hopefully something like
//user: xxxx
// deck: [{}{}{}] with {} being data of a card
async function getDeck(user){
    const deck = deckCollection.findOne({user: user});
    return deck;
}

async function addDeck(deck) {
  deckCollection.insertOne(deck);
}


async function addCard(user, card) {
  projection = {cards: 1, user: 1};
  const cursor = await deckCollection.findOne({ user });

  if (cursor) {
    const updatedCards = [...cursor.cards, card];
    await deckCollection.updateOne({ user }, { $set: { cards: updatedCards } });
  } else {
    const newUserDeck = { user, cards: [card] };
    await addDeck(newUserDeck);
    
  }
}


module.exports = {
    getUser,
    getUserByToken,
    createUser,
    getDeck,
    addCard,
    addDeck
};