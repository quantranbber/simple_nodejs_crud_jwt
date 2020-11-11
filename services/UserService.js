const User = require('../schema/user');

module.exports = {
    getUserByUsername: (p_username, callback) => {
        User.findOne({
            username : p_username
        }).exec(function(error, result) {
            if (error) {
                callback(error);
            }
            return callback(null, result);
        });
    },
    createUser : (data, callback) => {
        User.findOne({username : data.username}, (error, user) => {
            if(user == null) {
                if (error) {
                    callback(error);
                }
                const user = new User();
                user.username = data.username;
                user.password = data.password;
                user.save((error, result) => {
                    if (error) {
                        callback(error);
                    }
                    return callback(null, result);
                })
            } else {
                callback('user existed!');
            }
        });
    }
}