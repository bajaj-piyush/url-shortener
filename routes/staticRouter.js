const express = require("express");
const router = express.Router();
const { restrictTo } = require("../middlewares/auth.js");

const URL = require("../models/url.js");

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({});

  return res.render("home", { urls: allUrls });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: allUrls });
});

router.get("/signUp", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
