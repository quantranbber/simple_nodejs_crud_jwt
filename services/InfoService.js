const Info = require('../schema/info');

module.exports = {
    getInfoByName : (p_name, callback) => {
        Info.findOne({
            name : p_name
        }).exec(function (err, result) {
            if (err) {
                callback(err);
            }
            return callback(null, result);
        });
    },
    updateInfo : (infoDTO, callback) => {
        Info.updateOne(
            { "_id" : infoDTO.id },
            {$set: {"name" : infoDTO.name, "value" : infoDTO.value}},
            function (err, result) {
                if (err) {
                    callback(err);
                }
                return callback(null, result);
            }
        )
    },
    deleteInfo : (id, callback) => {
        Info.deleteOne(
            { "_id" : id },
            function (err, result) {
                if (err) {
                    callback(err);
                }
                return callback(null, 'delete success!');
            }
        )
    },
    createInfo : (data, callback) => {
        Info.findOne({name : data.name}, (error, info) => {
            if(info == null) {
                if (error) {
                    callback(error);
                }
                const info = new Info();
                info.name = data.name;
                info.value = data.value;
                info.save((error, result) => {
                    if (error) {
                        callback(error);
                    }
                    return callback(null, result);
                })
            } else {
                callback("info's name existed!");
            }
        });
    }
}