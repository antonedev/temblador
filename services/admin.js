const Art = require("../models/GalleryArt");

exports.getAllArt = (callback) => {
  Art.find({}, (err, files) => {
    if (err) callback(err, null);
    else  callback(null, files);
  });
};
