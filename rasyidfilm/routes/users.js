var express = require("express");
var models = require("../models");
var router = express.Router();

const bcrypt = require("bcrypt");
const helpers = require("../helpers/util");
const saltRounds = 10;
const fs = require("fs");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const users = await models.User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ err : "Terjadi Kesalahan" });
  }
});

router.post("/add", async function (req, res, next) {
  try {
    bcrypt.hash(
      req.body.password,
      saltRounds,
      async function (err, hashPassword) {
        if (err) throw err;
        const checkUser = await models.User.findOne({
          where: {
            email: req.body.email,
          },
        });

        if (checkUser)
          return res.status(500).json({ err: "email already exist" });
        req.body.password = hashPassword;
        const user = await models.User.create(req.body);
        res.status(201).json(user);
      }
    );
  } catch (err) {
    res.status(500).json({ err : "Terjadi Kesalahan" });
  }
});

router.put("/edit", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const user = await models.User.findOne({
      where: {
        id: req.body.userToken.userId,
      },
    });
    bcrypt.hash(
      req.body.password,
      saltRounds,
      async function (err, hashPassword) {
        if (err) throw err;
        req.body.password = req.body.password
          ? hashPassword
          : user.dataValues.password;

        const userEdit = await models.User.update(req.body, {
          where: {
            id: req.body.userToken.userId,
          },
          returning: true,
          plain: true,
        });

        res.status(201).json(userEdit[1]);
      }
    );
  } catch (err) {
    res.status(500).json({ err : "Terjadi Kesalahan" });
  }
});

router.delete("/delete", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const video = await models.Video.findAll({
      where: {
        UserId: req.body.userToken.userId,
      },
    });

    if (video.length != 0) {
      video.forEach((m) => {
        fs.unlinkSync(
          __dirname +
            "/../public/images/thumbnail/" +
            `${m.dataValues.thumbnail}`
        );

        fs.unlinkSync(
          __dirname +
            "/../public/video/" +
            `${m.dataValues.UrlVideo}`
        );
      });
    }

    const userDelete = await models.User.destroy({
      where: {
        id: req.body.userToken.userId,
      },
    });

    res.status(201).json({});
  } catch (err) {
    res.status(500).json({ err : "Terjadi Kesalahan" });
  }
});

module.exports = router;
