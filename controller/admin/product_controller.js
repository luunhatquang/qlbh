const Product = require("../../model/products_model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);

    let find = { deleted: false };
    if (req.query.status) {
        find.status = req.query.status;
    }

    const countProduct = await Product.countDocuments(find);
    const keyword = searchHelper(req.query, find);

    let objectPagination = await paginationHelper({
        currentPage: 1,
        limitItem: 4,
    }, req.query, countProduct);

    const products = await Product.find(find)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);

    res.render("admin/pages/products/index", {
        pageTitle: "Quản lý sản phẩm",
        products,
        filterStatus,
        keyword,
        pagination: objectPagination
    });
};