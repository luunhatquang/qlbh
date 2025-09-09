const express = require("express");
const multer = require("multer");
const upload = multer();
const product = express.Router();
const controller = require("../../controller/admin/product_controller");
const validate = require("../../validates/admin/product_validates");
const uploadCloud = require("../../middleware/admin/uploadCloud_middleware");


product.get("/", controller.index);
product.patch("/change-status/:status/:id", controller.changeStatus);
product.patch("/change-multi", controller.changeMulti);
product.delete("/delete/:id", controller.delete);
product.get("/create", controller.create);
product.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.uploadImage,
    validate.createPost,
    controller.createPost
);

product.get("/edit/:id", controller.edit);
product.patch("/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.uploadImage,
    validate.createPost,
    controller.editPatch
);

product.get("/detail/:id", controller.detail);
module.exports = product;