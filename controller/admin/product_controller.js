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

module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { status: status });
    const referer = req.get('referer')
    res.redirect(referer);
};

module.exports.changeMulti = async (req, res) => {
    console.log(req.body);
    const ids = req.body.ids.split(",");
    const status = req.body.type;
    
    switch(status) {
        case "active":
            await Product.updateMany({_id: {$in: ids} }, {$set: {status: "active"}})
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids} }, {$set: {status: "inactive"}})
            break;
        default:
            break;
    }
    const referer = req.get('referer')
    res.redirect(referer);
}
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    const referer = req.get('referer')
    res.redirect(referer);
}