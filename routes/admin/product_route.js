const express = require("express");
const product = express.Router();
const controller = require("../../controller/admin/product_controller");
product.get("/", controller.index);

product.patch("/change-status/:status/:id", controller.changeStatus);
product.patch("/change-multi", controller.changeMulti);


module.exports = product;