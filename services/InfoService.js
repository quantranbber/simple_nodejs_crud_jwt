const Info = require('../schema/info');

module.exports = {
    getInfoByName : async (p_name) => {
        return Info.findOne({
            name: p_name
        });
    },
    updateInfo : async (infoDTO) => {
        return Info.updateOne(
            { "_id" : infoDTO.id },
            {$set: {"name" : infoDTO.name, "value" : infoDTO.value}}
        );
    },
    deleteInfo : async (id) => {
        return Info.deleteOne(
            { "_id" : id }
        );
    },
    createInfo : async (data) => {
        let obj;
        try {
            let checkInfo =  await Info.findOne({name : data.name});
            if (checkInfo) {
                obj = "Info existed!";
            } else {
                let info = new Info();
                info.name = data.name;
                info.value = data.value;
                var savedInfo = await info.save();
                if (savedInfo) {
                    obj = savedInfo;
                }
            }
        } catch (err) {
            obj = err;
        }
        return obj;
    }
}