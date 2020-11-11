const { mongoose } = require('../utils/db');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    created_date: Date
});

const User = mongoose.model('User', userSchema, "tbl_user");

module.exports = User;