var express = require("express");
var router = express.Router();
var models = require("../models");
var jwt = require("jsonwebtoken");

const helpers = require("../helpers/util");
const bcrypt = require("bcrypt");
const { response } = require("../app");
const saltRounds = 10;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/api/auth", async function (req, res, next) {
  try {
    const user = await models.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(500).json({ err: "email or password wrong" });

    bcrypt.compare(
      req.body.password,
      user.dataValues.password,
      function (err, result) {
        if (err) throw err;
        if (result) {
          var token = jwt.sign(
            {
              userId: user.dataValues.id,
              firstname: user.dataValues.firstname,
              lastname: user.dataValues.lastname,
            },
            "shhhhh"
          );
          res.json(token);
        } else {
          res.status(500).json({ err: "Terjadi Kesalahan" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ err : "Terjadi Kesalahan" });
  }
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/watch/:id", function (req, res, next) {
  res.render("watch/view");
});

router.get("/channel/:id", function (req, res, next) {
  res.render("channel/view");
});

router.get("/studio", function (req, res, next) {
  res.render("studio/list");
});

router.get("/studio/add", function (req, res, next) {
  res.render("studio/form-add");
});

router.get("/studio/edit/:idVideo", function (req, res, next) {
  res.render("studio/form-edit");
});

router.get("/api/token", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const user = await models.User.findOne({
      where: {
        id: req.body.userToken.userId,
      },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ err : "Terjadi Kesalahan" });
  }
});

router.get("/editProfile", function (req, res, next) {
  res.render("edit-profile");
});

module.exports = router;
