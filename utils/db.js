const mongoose = require('mongoose');
require('dotenv').config({path:'./proccess.env'});
const url = process.env.MONGO_DB_URL;
try {
    console.log("connected to mongodb");
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) throw err;
        console.log('Successfully connected');
    });
} catch (error) {
    console.log(error);
}

module.exports = {
    mongoose
}