const service = require('../services/InfoSerivce');

module.exports = {
    getInfoByName: (req, res) => {
        service.getInfoByName(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.json({
                success: 1,
                data: results[0]
            });
        });
    },
    updateInfo: (req, res) => {
        let infoDTO = {};
        infoDTO.id = req.params.id;
        infoDTO.name = req.body.name;
        infoDTO.value = req.body.value;
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
        service.deleteInfo(req.params.id, (err, results) => {
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