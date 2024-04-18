const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');


(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {

  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

//change2:
async function logVote(userId, movieTitle) {
    const existingVote = await db.collection('votes').findOne({ userId: userId });
    
    if (existingVote) {
      await db.collection('votes').updateOne({ userId: userId }, { $set: { movieTitle: movieTitle, votedAt: new Date() } });
      return { updated: true, movieTitle: movieTitle };
    } else {

      const vote = {
        userId: userId,
        movieTitle: movieTitle,
        votedAt: new Date()
      };
      await db.collection('votes').insertOne(vote);
      return { created: true, movieTitle: movieTitle };
    }
  }


//does not work yet?
async function getTopVotedMovie() {
    try {
        const result = await db.collection('votes').aggregate([
            { $group: { _id: "$movieTitle", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]).toArray();
        return result[0]; // returns the movie with the highest vote count
    } catch (error) {
        console.error("Error fetching top voted movie:", error);
        return null; // handle error appropriately
    }
}

  


module.exports = {
  getUser,
  getUserByToken,
  createUser,
  logVote,
  getTopVotedMovie,
};
