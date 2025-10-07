const express = require("express");
const multer = require("multer");
const upload = multer();
const product = express.Router();
const controller = require("../../controller/admin/product_category_controller");
const validate = require("../../validates/admin/product_category_validates");
const uploadCloud = require("../../middleware/admin/uploadCloud_middleware");



product.get("/", controller.index); 
product.get("/create", controller.create);
product.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.uploadImage,
     validate.createPost,
    controller.createPost
);
product.get("/edit/:id", controller.edit);
product.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.uploadImage,
    validate.createPost,
    controller.editPatch,);
module.exports = product;