const User = require('../schema/user');

module.exports = {
    getUserByUsername: async (p_username) => {
        let result;
        try {
            result = await User.findOne({
                username : p_username
            });
        } catch (err) {
            result = err;
        }
        return result;
    },
    createUser : async (data) => {
        let obj;
        try {
            let checkInfo =  await User.findOne({username : data.username});
            if (checkInfo) {
                obj = "User existed!";
            } else {
                let user = new User();
                user.username = data.username;
                user.password = data.password;
                var savedUser = await user.save();
                if (savedUser) {
                    obj = savedUser;
                }
            }
        } catch (err) {
            obj = err;
        }
        return obj;
    }
}