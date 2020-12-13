const fs = require("fs");
const Art = require("../models/GalleryArt");

exports.getAllArt = (callback) => {
  Art.find({}, (err, result) => {
    callback(err, result);
  });
};

exports.getSomeArt = (amount, callback) => {
  Art.find({})
    .limit(amount)
    .exec((err, result) => {
      callback(err, result);
    });
};

exports.removeArtBy_id = (_id, callback) => {
  Art.deleteOne({ _id: _id }, (err, result) => {
    callback(err, result);
  });
};

exports.addArt = (path, filename, title, altText, filesize, type, callback) => {
  fs.copyFile(path, "./public/img/uploads/" + filename, (err) => {
    if (err) callback(err, null);
  });
  const newArt = new Art({
    title: title,
    filename: filename,
    altText: altText,
    filesize: filesize,
    type: type,
  });
  newArt.save((err, result) => {
    callback(err, result);
  });
};
