const Product = require("../../model/products_model");

module.exports.index = async(req, res) => {
    let filterStatus = [
    {
        name: "Tất cả",
        status: "",
        class: ""
    },
    {
        name: "Hoạt động",
        status: "active",
        class: ""
    },
    {
        name: "Dừng hoạt động",
        status: "inactive",
        class: ""
    }];

    let find = {
        deleted: false,
    }

    let keyword = "";
    if(req.query.keyword) {
        keyword = req.query.keyword;
        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }
    console.log(keyword);
    if(req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        find.status = req.query.status
        filterStatus[index].class = "active";
    }
    else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }
    const products = await Product.find(find);

    res.render("admin/pages/products/index",{
    pageTitle: "Quản lý sản phẩm",
    products: products, 
    filterStatus: filterStatus,
    keyword: keyword
});
}
    