const express = require("express");

const router = express.Router();

router.post("/order", (req, res) => {
  res.json({ message: "How'd you get here?" });
});

router.get("/store", (req, res) => {
  res.render("store", { inventory: 0 });
});

router.get("/admin/:secret?", (req, res) => {
  res.render("admin");
});

module.exports = router;
