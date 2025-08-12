const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/product_controller");

router.get("/", controller.product);

module.exports = router;