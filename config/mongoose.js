const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
const db = mongoose.connection;
db.on('error',console.error.bind(console, "Error connecting to MongoDB"));
db.once('open',() => {
    console.log('Connected to Database :: MongoDB');
});
module.exports = db;

