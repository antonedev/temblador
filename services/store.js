const fs = require("fs");
const Product = require("../models/StoreProduct");

exports.getAllProducts = (callback) => {
  Product.find({}, (err, result) => {
    callback(err, result);
  });
};

exports.getSomeProducts = (amount, callback) => {
  Product.find({})
    .limit(amount)
    .exec((err, result) => {
      callback(err, result);
    });
};

exports.getProductById = (id, callback) => {
  Product.findOne({ _id: id }, (err, result) => {
    callback(err, result);
  });
};

exports.removeProductBy_id = (_id, callback) => {
  Product.deleteOne({ _id: _id }, (err, result) => {
    callback(err, result);
  });
};

exports.addProduct = (
  path,
  filename,
  name,
  price,
  description,
  altText,
  filesize,
  type,
  callback
) => {
  fs.copyFile(path, "./public/img/uploads/" + filename, (err) => {
    if (err) callback(err, null);
  });
  const newProduct = new Product({
    filename: filename,
    name: name,
    price: price,
    description: description,
    altText: altText,
    filesize: filesize,
    type: type,
  });
  newProduct.save((err, result) => {
    callback(err, result);
  });
};
