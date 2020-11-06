const db = require('../utils/db');

module.exports = {
    getInfoByName : (p_name, callback) => {
        let sql = "select * from tbl_info where id = ?";
        db.query(
            sql,
            [p_name],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updateInfo : (infoDTO, callback) => {
        let sql = "update tbl_info set name = ?, value = ? where id = ?";
        db.query(
            sql,
            [
                infoDTO.name,
                infoDTO.value,
                infoDTO.id
            ],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteInfo : (id, callback) => {
        let sql = "delete from tbl_info where id = ?";
        db.query(
            sql,
            [id],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    },
    createInfo : (data, callback) => {
        let sql = "insert into tbl_info (name, value) values (?,?)";
        db.query(
            sql,
            [
                data.name,
                data.value
            ],
            (error, results, fields) => {
                console.log(data);
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    }
}