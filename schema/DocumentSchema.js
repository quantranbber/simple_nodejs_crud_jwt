const { mongoose } = require('../utils/db');

const documentSchema = mongoose.Schema({
    idDoc: String,
    name: String
});

module.exports = documentSchema;