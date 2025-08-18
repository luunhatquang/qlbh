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
    const products = await Product.find(find);

    res.render("admin/pages/products/index",{
    pageTitle: "Quản lý sản phẩm",
    products: products, 
    filterStatus: filterStatus,
    keyword: keyword
});
}
    