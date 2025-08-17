const express = require("express");
const dashboard = express.Router();
const controller = require("../../controller/admin/dashboard_controller");
dashboard.get("/", controller.index);

module.exports = dashboard;