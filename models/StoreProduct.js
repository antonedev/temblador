const Mongoose = require("mongoose");

const productSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  filename: { type: String, required: true },
  filesize: { type: Number, required: true },
  type: { type: String, required: true },
  altText: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = Mongoose.model("Product", productSchema);

module.exports = Product;
