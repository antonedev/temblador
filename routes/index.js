const express = require("express");
const formidable = require("formidable");

const router = express.Router();
const Store = require("../services/store");
const Gallery = require("../services/gallery");
const stripe = require("stripe")(
  "sk_test_51HwgrHGcp6Uuydzak0PD5K6LGxtCGeY3CmMtiP2EdDyo24e3bFApS8NGM4GWXFJjT5HdWBV9rZU3XCc1DZz2GYud00wf6M5FB1"
);

router.get("/", (req, res) => {
  Gallery.getSomeArt(6, (err, art) => {
    if (err) res.json(err);
    else
      Store.getSomeProducts(4, (err, products) => {
        if (err) res.json(err);
        else res.render("index", { art, products });
      });
  });
});

router.get("/product/:id", (req, res) => {
  Store.getProductById(req.params.id, (err, product) => {
    if (err) res.json(err);
    else res.render("product", { product });
  });
});

router.get("/admin", (req, res) => {
  Gallery.getAllArt((err, allArt) => {
    if (err) res.json(err);
    else
      Store.getAllProducts((err, allProducts) => {
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
      Gallery.removeArtBy_id(fields.id, (err, ignore) => {
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
      Gallery.addArt(
        files.uploadedFile.path,
        files.uploadedFile.name,
        fields.title,
        fields.altText,
        files.uploadedFile.size,
        files.uploadedFile.type,
        (err, result) => {
          if (err) res.json(err);
          else res.redirect("/admin");
        }
      );
    }
  });
});

router.post("/admin/deleteProduct", (req, res) => {
  const form = formidable();
  form.parse(req, (err, fields, files) => {
    if (err) res.json(err);
    else {
      Store.removeProductBy_id({ _id: fields.id }, (err, ignore) => {
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
      Store.addProduct(
        files.uploadedFile.path,
        files.uploadedFile.name,
        fields.name,
        fields.price,
        fields.description,
        fields.altText,
        files.uploadedFile.size,
        files.uploadedFile.type,
        (err, ignore) => {
          if (err) res.json(err);
          else res.redirect("/admin");
        }
      );
    }
    ``;
  });
});

module.exports = router;
