const express = require("express");
const product = express.Router();
const controller = require("../../controller/admin/product_controller");
product.get("/", controller.index);

product.get("/change-status/:status/:id", controller.changeStatus);

module.exports = product;