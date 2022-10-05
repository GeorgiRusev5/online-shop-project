const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const dotenv = require('dotenv');
dotenv.config();

let database;
async function connectToDatabase(){         //change the client URL with your custom user URL from MongoDB cloud.
   const client = await MongoClient.connect(`mongodb+srv://Georgi_Rusev:${process.env.MONGODB_PASSWORD}@clusters.med9rjq.mongodb.net/?retryWrites=true&w=majority`)
    database = client.db('online-shop');
}

function getDb(){
    if (!database){
        throw new Error('You must connect first!')
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}
