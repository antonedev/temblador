const Mongoose = require("mongoose");

const Product = new Mongoose.Schema({
  name: { type: String, required: true },
  filename: { type: String, required: true },
  filesize: { type: Number, required: true },
  altText: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = Product;
