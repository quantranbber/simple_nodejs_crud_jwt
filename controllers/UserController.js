const service = require('../services/UserService');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    generateToken: async (req, res) => {
        const body = req.body;
        let result = await service.getUserByUsername(body.username);
        if (result) {
            const checkUser = compareSync(body.password, result.password);
            if (checkUser) {
                result.password = undefined;
                const jsonToken = sign({ result: result }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    token: "Bearer " + jsonToken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        }
    },
    createUser: async (req, res) => {
        let data = req.body;
        let salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);
        let result = await service.createUser(data);
        if (result) {
            return res.json({
                success: 1,
                data: result
            });
        } else {
            return res.status(500).json({
                success: 0,
                message: "failed"
            });
        }
    },
    findUserByUsername: async (req, res) => {
        let username = req.query.username;
        let result;
        try {
            result = await service.getUserByUsername(username);
            return res.json({
                success: 1,
                data: result
            });
        } catch (err) {
            return res.status(500).json({
                success: 0,
                message: err
            });
        }
    },
}