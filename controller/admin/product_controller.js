const Product = require("../../model/products_model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

module.exports.index = async(req, res) => {
    
    const filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted: false,
    }
    if(req.query.status) {
        find.status = req.query.status;
    }

    const keyword = searchHelper(req.query, find);

    let objectPagination = {
        currentPage: 1,
        limitItem : 4
    }

    if(req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }

    const countProduct = await Product.countDocuments(find);
    const totalPage = Math.ceil(countProduct/objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    console.log(totalPage);
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;


    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);;

    res.render("admin/pages/products/index",{
    pageTitle: "Quản lý sản phẩm",
    products: products, 
    filterStatus: filterStatus,
    keyword: keyword,
    pagination: objectPagination
    });
}
    