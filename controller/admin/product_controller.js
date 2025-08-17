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

    if(req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        find.status = req.query.status
        filterStatus[index].class = "active";
    }
    else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }
    let find = {
        deleted: false
    }
    const products = await Product.find(find);

    res.render("admin/pages/products/index",{
    pageTitle: "Quản lý sản phẩm",
    products: products, 
    filterStatus: filterStatus 
});
}
    