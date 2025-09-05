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
        .sort({ position: "desc" })
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip)

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
    req.flash('success','Cập nhật trạng thái sản phẩm thành công');
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
            req.flash('success',`Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids} }, {$set: {status: "inactive"}})
            eq.flash('success',`Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
            break;
        case "delete-all":
            await Product.updateMany({_id: {$in: ids} }, {$set: {deleted: true, deletedAt: new Date()}})
            req.flash('success',`Xoá ${ids.length} sản phẩm thành công}`);
            break;
        case "position":
            for(const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({_id: id}, {position: position});
                req.flash('success','Cập nhật vị trí sản phẩm thành công');
            }
        default:
            break;
    }
    const referer = req.get('referer')
    res.redirect(referer);
}
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne(
        { _id: id },
        { 
        deleted: true,
        deletedAt: new Date()
        }
    );
    req.flash('success','Xoá sản phẩm thành công');
    const referer = req.get('referer')
    res.redirect(referer);
}

module.exports.create = (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm"
    });
}

module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position == '') {

        req.body.position = await Product.countDocuments()+ 1;
    }
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    const product = new Product(req.body);
    await product.save();
    req.flash('success','Thêm sản phẩm thành công');
    const referer = req.get('referer')
    res.redirect(referer);
}
