const User = require('../schema/user');
const { mongoose } = require('../utils/db');

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
                user.exercises = data.exercises;
                var savedUser = await user.save();
                if (savedUser) {
                    obj = savedUser;
                }
            }
        } catch (err) {
            obj = err;
        }
        return obj;
    },
    countExcercisesInUser: async (id) => {
        const idObj = mongoose.Types.ObjectId(id);
        return User.aggregate()
            .match({ _id: idObj })
            .project({ size: { $size: "$exercises" } });
    },
    countDocumentsInUser: async (username) => {
        return User.aggregate()
            .match({ username: username })
            .project({ size: {
                $size: {
                    $reduce : {
                        input : "$exercises",
                        initialValue : [],
                        in : {
                            "$concatArrays": [
                                "$$value", {
                                    "$filter": {
                                        input: "$$this.documents",
                                        as: "item",
                                        cond: { $eq: [ "$$item.name", "doc12" ] }
                                    }
                                }
                            ]
                        }
                    }
                }
            }});
    }
}