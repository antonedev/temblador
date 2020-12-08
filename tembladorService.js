require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const app = express();

app.set("view engine", "pug");
app.use(express.static("public"));
app.use("/", router);

// mongoose.connect(process.env.MONGO, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("error", console.log(console, "connection error:"));
// db.once("open", () => {
app.listen(process.env.PORT, () => {
  console.log("tembladorService started on " + process.env.PORT);
  console.log("mode: " + app.get("env"));
});
// });
