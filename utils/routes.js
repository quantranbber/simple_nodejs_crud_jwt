module.exports = function(app) {
    let infoCtrl = require('../controllers/InfoController');
    let userCtrl = require('../controllers/UserController');
    let tokenValidate = require('../auth/TokenValidate');

    app.route('/info')
        .post(tokenValidate.checkToken, infoCtrl.createInfo)
        .get(tokenValidate.checkToken, infoCtrl.getInfoByName)
        .put(tokenValidate.checkToken, infoCtrl.updateInfo)
        .delete(tokenValidate.checkToken, infoCtrl.deleteInfo);
    app.route('/generateToken')
        .post(userCtrl.generateToken);
    app.route('/user')
        .get(tokenValidate.checkToken, userCtrl.findUserByUsername)
        .post(userCtrl.createUser);
};