const service = require('../services/InfoService');

module.exports = {
    getInfoByName: (req, res) => {
        service.getInfoByName(req.query.name, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateInfo: (req, res) => {
        let infoDTO = {};
        infoDTO.id = req.query.id;
        infoDTO.name = req.body.name.trim();
        infoDTO.value = req.body.value.trim();
        service.updateInfo(infoDTO, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.json({
                success: 1,
                data: "update successful"
            });
        });
    },
    deleteInfo: (req, res) => {
        service.deleteInfo(req.query.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.json({
                success: 1,
                data: "delete successful"
            });
        });
    },
    createInfo: (req, res) => {
        const data = req.body;
        service.createInfo(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.json({
                success: 1,
                message: "create successful"
            });
        });
    }
}