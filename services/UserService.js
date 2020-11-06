const db = require('../utils/db');

module.exports = {
    getUserByUsername: (username, callback) => {
        let sql = "select * from tbl_user where username = ?";
        db.query(
            sql,
            [username],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    createUser : (data, callback) => {
        let sql = "insert into tbl_user (username, password, created_date) values (?,?,?)";
        db.query(
            sql,
            [
                data.username,
                data.password,
                new Date()
            ],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    }
}