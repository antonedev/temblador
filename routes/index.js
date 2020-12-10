const express = require("express");
const formidable = require("formidable");
const fs = require("fs");

const router = express.Router();
const Art = require("../models/GalleryArt");
const Product = require("../models/StoreProduct");

router.get("/", (req, res) => {
  Art.find({}, (err, allArt) => {
    if (err) res.json(err);
    else
      Product.find({}, (err, allProducts) => {
        if (err) res.json(err);
        else res.render("index", { allArt, allProducts });
      });
  });
});

router.get("/admin", (req, res) => {
  Art.find({}, (err, allArt) => {
    if (err) res.json(err);
    else
      Product.find({}, (err, allProducts) => {
        if (err) res.json(err);
        else res.render("admin", { allArt, allProducts });
      });
  });
});

router.post("/admin/deleteArt", (req, res) => {
  const form = formidable();
  form.parse(req, (err, fields, files) => {
    if (err) res.json(err);
    else {
      Art.deleteOne({ _id: fields.id }, (err, ignore) => {
        if (err) res.json(err);
        else res.redirect("/admin");
      });
    }
  });
});

router.post("/admin/addArt", (req, res) => {
  const form = formidable({ keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    if (err) res.json(err);
    else {
      console.log(files);
      fs.copyFile(
        files.uploadedFile.path,
        "./public/img/uploads/" + files.uploadedFile.name,
        (err) => {
          if (err) console.log(err);
        }
      );
      const newArt = new Art({
        title: fields.title,
        filename: files.uploadedFile.name,
        filesize: files.uploadedFile.size,
        type: files.uploadedFile.type,
        caption: fields.caption || "",
      });
      newArt.save((err, ignore) => {
        if (err) res.json(err);
        else res.redirect("/admin");
      });
    }
  });
});

router.post("/admin/deleteProduct", (req, res) => {
  const form = formidable();
  form.parse(req, (err, fields, files) => {
    if (err) res.json(err);
    else {
      Product.deleteOne({ _id: fields.id }, (err, ignore) => {
        if (err) res.json(err);
        else res.redirect("/admin");
      });
    }
  });
});

router.post("/admin/addProduct", (req, res) => {
  const form = formidable();
  form.parse(req, (err, fields, files) => {
    if (err) res.json(err);
    else {
      console.log(files);
      fs.copyFile(
        files.uploadedFile.path,
        "./public/img/uploads/" + files.uploadedFile.name,
        (err) => {
          if (err) console.log(err);
        }
      );
      const newProduct = new Product({
        name: fields.name,
        filename: files.uploadedFile.name,
        filesize: files.uploadedFile.size,
        type: files.uploadedFile.type,
        altText: fields.altText,
        price: fields.price,
        description: fields.description,
      });
      newProduct.save((err, ignore) => {
        if (err) res.json(err);
        else res.redirect("/admin");
      });
    }
  });
});

module.exports = router;
