require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const middlewares = require("./middleware/middleware");
const productRoute = require("./routes/products");
const userRoute = require("./routes/users");
const loginRoute = require("./routes/login");

// Mongoose
const mongoUri = process.env.MONGO_URI;
mongoose.set("strictQuery", false);
console.log("Connecting to", mongoUri);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((err) => {
    console.log("DB Connection Error".err);
  });

const app = express();
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.json("Welcome to product app");
});
app.use(middlewares.tokenExtractor);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/login", loginRoute);
app.use(middlewares.unknownEndPoint);
app.use(middlewares.errorHandler);

module.exports = app;
