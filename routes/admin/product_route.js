const express = require("express");
const multer = require("multer");
const storageMulter = require("../../helpers/storage");
const upload = multer({ storage: storageMulter });
const product = express.Router();
const controller = require("../../controller/admin/product_controller");
const validatec = require("../../validates/admin/product_validates");

product.get("/", controller.index);
product.patch("/change-status/:status/:id", controller.changeStatus);
product.patch("/change-multi", controller.changeMulti);
product.delete("/delete/:id", controller.delete);
product.get("/create", controller.create);
product.post(
    "/create",
    upload.single("thumbnail"), 
    validatec.createPost,
    controller.createPost
);



module.exports = product;