const service = require('../services/UserService');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    generateToken: (req, res) => {
        const body = req.body;
        service.getUserByUsername(body.username, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid username or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsonToken = sign({ result: results }, process.env.JWT_KEY, {
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
        });
    },
    createUser: (req, res) => {
        let data = req.body;
        let salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);
        service.createUser(data, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            return res.json({
                success: 1,
                data: "create user successful"
            });
        });
    },
    findUserByUsername: (req, res) => {
        let username = req.query.username;
        service.getUserByUsername(username, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            return res.json({
                success: 1,
                data: result
            });
        });
    },
}