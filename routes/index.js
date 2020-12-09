const express = require("express");
const formidable = require("formidable");
const fs = require("fs");

const router = express.Router();
const Art = require("../models/GalleryArt");

router.get("/", (req, res) => {
  Art.find({}, (err, allArt) => {
    if (err) res.json(err);
    else res.render("index", { allArt });
  });
});

router.get("/store", (req, res) => {
  res.render("store", { inventory: 0 });
});

router.get("/admin", (req, res) => {
  Art.find({}, (err, allArt) => {
    if (err) res.json(err);
    else res.render("admin", { allArt });
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

module.exports = router;
