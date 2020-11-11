const { mongoose } = require('../utils/db');

const infoSchema = mongoose.Schema({
    name: String,
    value: String
});

const Info = mongoose.model('Info', infoSchema, "tbl_info");

module.exports = Info;