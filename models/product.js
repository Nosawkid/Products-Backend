const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product Name cannot be empty"],
  },
  productPrice: {
    type: Number,
    required: [true, "Product price cannot be empty"],
    default: 0,
    min: [0, "Product Price cannot be less than zero"],
  },
  productImgUrl: {
    type: String,
    required: [true, "Product must have an image"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

productSchema.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  },
});

module.exports = mongoose.model("Product", productSchema);
