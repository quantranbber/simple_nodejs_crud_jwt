const { mongoose } = require('../utils/db');
const documentSchema = require('./DocumentSchema');

const exerciseSchema = mongoose.Schema({
    name: String,
    documents: [documentSchema]
});

module.exports = exerciseSchema;