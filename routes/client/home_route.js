const express = require("express");
const home = express.Router();
const controller = require("../../controller/client/home_controller");
home.get("/", controller.index);

module.exports = home;