const Product = require("../../model/products_model");
const filterStatusHelper = require("../../helpers/filterStatus");

module.exports.index = async(req, res) => {
    
    const filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted: false,
    }
    if(req.query.status) {
        find.status = req.query.status;
    }
    let keyword = "";
    if(req.query.keyword) {
        keyword = req.query.keyword;
        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }
    console.log(keyword);
    const products = await Product.find(find);

    res.render("admin/pages/products/index",{
    pageTitle: "Quản lý sản phẩm",
    products: products, 
    filterStatus: filterStatus,
    keyword: keyword
});
}
    