const Express = require("express");
const Router = Express.Router();

const { login, dashboard } = require("../controllers/main");

const authMiddleware = require("../middleware/auth");

Router.route("/dashboard").get(authMiddleware, dashboard);
Router.route("/login").post(login);

module.exports = Router;
