const { mongoose } = require('../utils/db');
const exerciseSchema = require('./ExerciseSchema');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    created_date: Date,
    exercises: [exerciseSchema]
});

const User = mongoose.model('User', userSchema, "tbl_user");

module.exports = User;