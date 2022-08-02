module.exports = function(app) {
    var UserHandler = require('../controller/user2Controller');
    // todoList Routes
    app.route('/tasks').post(UserHandler.loginRequired, UserHandler.profile);
};