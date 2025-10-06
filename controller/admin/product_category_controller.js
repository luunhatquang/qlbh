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
        limitItem: 1000,
    }, req.query, countProduct);

    let sort = {};
    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else {
        sort.position = "desc"
    }

    function createTree(arr, parentId) {
        const tree = [];
        arr.forEach((item) => {
            if (String(item.parent_id || "") === String(parentId || "")) {
                const newItem = item.toObject ? item.toObject() : item;
                const children = createTree(arr, item._id);
                if (children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }

    

    const records = await ProductCategory.find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip)
    const recordsTree = createTree(records, "");
    res.render("admin/pages/category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: recordsTree,
        filterStatus,
        keyword,
        pagination: objectPagination
    });
};

module.exports.create = async (req, res) => {
    const records = await ProductCategory.find({ deleted: false }).sort({ position: 1 });

    function createTree(arr, parentId) {
        const tree = [];
        arr.forEach((item) => {
            if (String(item.parent_id || "") === String(parentId || "")) {
                const newItem = item.toObject ? item.toObject() : item;
                const children = createTree(arr, item._id);
                if (children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }

    const recordsTree = createTree(records, "");

    res.render("admin/pages/category/create", {
        pageTitle: "Thêm mới sản phẩm",
        records: recordsTree, // 
    });
};
module.exports.createPost = async (req, res,next) => {
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