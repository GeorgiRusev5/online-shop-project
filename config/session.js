const expressSession = require('express-session');  
const mongoDbStore = require("connect-mongodb-session");

const {MONGODB_PASSWORD} = require('../config');
const {MONGODB_SECRET_PASSWORD} = require('../config');

function createSessionStore() {
  const MongoDbStore = mongoDbStore(expressSession);
  
  const store = new MongoDbStore({ //change the current URL(uri) with your custom user URL from MongoDB cloud.
    uri: `mongodb+srv://Georgi_Rusev:${MONGODB_PASSWORD}@clusters.med9rjq.mongodb.net/?retryWrites=true&w=majority`,
    databaseName: "online-shop",
    collection: "sessions",
  });
  return store;
}

function createSessionConfig() {                     
  return {
    secret: MONGODB_SECRET_PASSWORD,    // you can set secret code for your DB collection
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 5 * 24 * 60 * 60 * 1000,
    },
  };
}

module.exports = createSessionConfig;