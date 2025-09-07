const Product = require("../../model/products_model"); 
module.exports.product = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });

    const newProducts = products.map(item => {
        item.priceNew = (item.price*(100 - item.discountPercentage) / 100).toFixed(0);
        return item;
    })

    console.log(products);
    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts
    });
}

module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug;
        const find =  {
            slug: slug,
            deleted: false,
            status: "active"
        }
        const product = await Product.findOne(find);
        res.render("client/pages/products/detail.pug", {
            pageTitle: product.title,
            product
        })
    }
    catch (error) {
        res.redirect("/products");
    }
}