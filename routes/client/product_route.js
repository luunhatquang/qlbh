const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/product_controller");

router.get("/", controller.product);
router.get("/detail/:slug", controller.detail);

module.exports = router;