const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const database = require("./config/database");
const router_admin = require("./routes/admin/index_route");
const router_client = require("./routes/client/index_route");
const system_config = require("./config/system");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const flash = require("express-flash");



const app = express();
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
database.connect();


app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

app.use(cookieParser("jahsjah"));
app.use(session({ cookie: { maxAge: 60000 } }))
app.use(flash());


app.locals.prefixAdmin = system_config.prefixAdmin;

router_admin(app);
router_client(app);
// app.get("/", (req, res) => {
//   res.render("client/pages/home/index.pug")
// });

// app.get("/products", (req, res) => {
//   res.render("client/pages/products/index.pug");
// });



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
