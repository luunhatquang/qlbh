const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const database = require("./config/database");
const router = require("./routes/client/index_route");
const app = express();
database.connect();


app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));

router(app);
// app.get("/", (req, res) => {
//   res.render("client/pages/home/index.pug")
// });

// app.get("/products", (req, res) => {
//   res.render("client/pages/products/index.pug");
// });



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
