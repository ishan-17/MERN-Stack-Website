const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://root:root@cluster0.fzbgubc.mongodb.net/nextjs_ecommerce?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const productsRouter = require("./routes/products");
const userRouter = require("./routes/user")
const orderRouter = require("./routes/order")
app.use("/products", productsRouter);
app.use("/user", userRouter)
app.use("/order", orderRouter)
app.listen(3001, () => console.log("Server Started"));
