const Mongoose = require("mongoose");

const artSchema = new Mongoose.Schema({
  title: { type: String, required: true },
  filename: { type: String, required: true },
  filesize: { type: Number, required: true },
  type: { type: String, required: true },
  altText: { type: String, required: false },
});

const Art = Mongoose.model("Art", artSchema);

module.exports = Art;
