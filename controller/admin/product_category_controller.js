const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const productValidates = require("../../validates/admin/product_validates");
const systemconfig = require("../../config/system");
const ProductCategory = require("../../model/product_category_model");

module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);

    let find = { deleted: false };
    if (req.query.status) {
        find.status = req.query.status;
    }

    const countProduct = await ProductCategory.countDocuments(find);
    const keyword = searchHelper(req.query, find);

    let objectPagination = await paginationHelper({
        currentPage: 1,
        limitItem: 4,
    }, req.query, countProduct);

    let sort = {};
    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else {
        sort.position = "desc"
    }
    const records = await ProductCategory.find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip)

    res.render("admin/pages/category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: records,
        filterStatus,
        keyword,
        pagination: objectPagination
    });
};

module.exports.create = (req, res) => {
    res.render("admin/pages/category/create", {
        pageTitle: "Thêm mới sản phẩm"
    });
}   

module.exports.createPost = async (req, res,next) => {
    console.log(req.body);
    if(req.body.position == "") {
        const countRecords = await ProductCategory.countDocuments();
        req.body.position = countRecords + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    let data = { ...req.body };
    if (Array.isArray(data.parent_id)) {
    data.parent_id = data.parent_id.find(id => id && id.trim() !== '') || '';
    }
    data.parent_id = String(data.parent_id || '');
    const record = new ProductCategory(data);
    await record.save();
    const referer = req.get('referer')
    res.redirect(referer);
    
}