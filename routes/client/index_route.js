const products_router = require("./product_route");
const home_router = require("./home_route");


module.exports = (app) => {
    app.use("", home_router);
    app.use("/products",products_router);

}