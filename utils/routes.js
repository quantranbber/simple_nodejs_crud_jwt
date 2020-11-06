module.exports = function(app) {
    let infoCtrl = require('../controllers/InfoController');
    let userCtrl = require('../controllers/UserController');
    let tokenValidate = require('../auth/TokenValidate');

    app.route('/info/:id')
        .get(tokenValidate.checkToken, infoCtrl.getInfoByName)
        .put(tokenValidate.checkToken, infoCtrl.updateInfo)
        .delete(tokenValidate.checkToken, infoCtrl.deleteInfo);
    app.route('/generateToken')
        .post(userCtrl.generateToken);
    app.route('/info/create')
        .post(infoCtrl.createInfo);
    app.route('/user/create')
        .post(userCtrl.createUser);
};