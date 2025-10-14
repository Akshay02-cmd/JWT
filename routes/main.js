const Express = require("express");
const Router = Express.Router();

const { login, dashboard } = require("../controllers/main");

Router.route('/dashboard').get(dashboard)
Router.route('/login').post(login)


module.exports = Router