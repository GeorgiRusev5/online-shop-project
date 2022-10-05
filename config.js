const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    MONGODB_SECRET_PASSWORD: process.env.MONGODB_SECRET_PASSWORD,
    HOST_ADDRESS: process.env.HOST_ADDRESS,
    PORT: process.env.PORT,
    STRIPE_KEY: process.env.STRIPE_KEY
}