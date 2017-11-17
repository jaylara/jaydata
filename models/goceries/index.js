const mongoose = require('mongoose');

// connect to Mongoose/Mongo DB
mongoose.connection.openUri(process.env.MONGODB_URI || process.env.MONGO_DB_CONN, {}, (err, conn) => {
    if (err)    console.log('Error connecting to Mongo DB.', err);
    else        console.log('Mongoose successfully connected to Mongo DB.');
});

//add mongo DB error event
mongoose.connection.on('error', (err) => {
    console.log(`MongoDB error: ${err}`);
});

//import models
const goceriesModels = {
    User : require('./user'),
    Item : require('./item'),
    Cart : require('./cart')
}

//exporting models for use by other files
module.exports = {
    Goceries : goceriesModels
};
