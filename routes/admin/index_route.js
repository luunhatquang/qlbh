const system_config = require("../../config/system");
const dashboard = require("./dashboard_route");
const product = require("./product_route");
const product_category = require("./product_category_route");

module.exports = (app) => {
    const PATH_ADMIN = system_config.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboard);
    app.use(PATH_ADMIN + "/products", product);
    app.use(PATH_ADMIN + "/product-categories", product_category);

}