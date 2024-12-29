const Product = require("../models/product");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

module.exports = {
  getAllProducts: async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
  },

  getProductById: async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "No Product found" });
    }
    res.status(200).json(product);
  },

  addNewProduct: async (req, res) => {
    const { productName, productPrice } = req.body;
    const user = req.user;
    if (!req.file) {
      return res.status(400).json({ error: "Product Image is required" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);

    const newProduct = new Product({
      productName,
      productPrice,
      productImgUrl: result.secure_url,
    });
    await newProduct.save();

    fs.unlinkSync(req.file.path);

    res.status(201).json("New Product Added Successfully");
  },
};
