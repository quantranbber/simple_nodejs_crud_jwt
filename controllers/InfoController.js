const service = require('../services/InfoService');

module.exports = {
    getInfoByName: async (req, res) => {
        var obj = await service.getInfoByName(req.query.name);
        if (obj) {
            return res.json({
                success: 1,
                data: obj
            });
        } else {
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }
    },
    updateInfo: async (req, res) => {
        let infoDTO = {};
        infoDTO.id = req.query.id;
        infoDTO.name = req.body.name.trim();
        infoDTO.value = req.body.value.trim();
        var obj = await service.updateInfo(infoDTO);
        if (obj) {
            return res.json({
                success: 1,
                data: obj
            });
        } else {
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }
    },
    deleteInfo: async (req, res) => {
        var result = await service.deleteInfo(req.query.id);
        if (result) {
            return res.json({
                success: 1,
                data: result
            });
        } else {
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }
    },
    createInfo: async (req, res) => {
        const data = req.body;
        var result = await service.createInfo(data);
        if (result) {
            return res.json({
                success: 1,
                data: result
            });
        } else {
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }
    }
}