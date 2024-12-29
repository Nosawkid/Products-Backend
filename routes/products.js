const productRouter = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const Product = require("../models/product");
const fs = require("fs");
const { userExtractor } = require("../middleware/middleware");

const productControllers = require("../controllers/products");

productRouter.get("/", productControllers.getAllProducts);

productRouter.get("/:id", productControllers.getProductById);

productRouter.post(
  "/",
  userExtractor,
  upload.single("productImgUrl"),
  productControllers.addNewProduct
);

module.exports = productRouter;
