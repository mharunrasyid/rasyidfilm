var express = require("express");
var router = express.Router();
var models = require("../models");

const helpers = require("../helpers/util");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

/* GET videos listing. */
router.get("/", async function (req, res, next) {
  try {
    const videos = await models.Video.findAll({
      include: [
        {
          model: models.User,
          attributes: ["id", "email", "firstname", "lastname", "createdAt"],
        },
      ],
      order: [["views", "DESC"]],
      where: {
        title: {
          [Op.like]: `%${req.query.searchName ? req.query.searchName : ""}%`,
        },
      },
    });

    res.json(videos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.get("/studio", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;

    const videos = await models.Video.findAll({
      limit: limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: models.User,
          attributes: ["id", "email", "firstname", "lastname", "createdAt"],
        },
      ],
      where: {
        UserId: req.body.userToken.userId,
        title: {
          [Op.like]: `%${req.query.searchTitle ? req.query.searchTitle : ""}%`,
        },
      },
    });

    const videosNoLimit = await models.Video.findAll({
      include: [
        {
          model: models.User,
          attributes: ["id", "email", "firstname", "lastname", "createdAt"],
        },
      ],
      where: {
        UserId: req.body.userToken.userId,
        title: {
          [Op.like]: `%${req.query.searchTitle ? req.query.searchTitle : ""}%`,
        },
      },
    });

    data = {
      videos,
      videosNoLimit: videosNoLimit.length,
      userToken: req.body.userToken,
      pIndex: page,
    };

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.get("/watch/:id", async function (req, res, next) {
  try {
    const videos = await models.Video.findAll({
      include: [
        {
          model: models.User,
          attributes: ["id", "email", "firstname", "lastname", "createdAt"],
        },
      ],
      order: [["views", "DESC"]],
      where: {
        id: {
          [Op.not]: req.params.id,
        },
      },
    });

    const video = await models.Video.findOne({
      include: [
        {
          model: models.User,
          attributes: ["id", "email", "firstname", "lastname", "createdAt"],
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    if (!video) return res.status(500).json({ err: "video not found!" });

    req.body.views = video.views + 1;
    const videoEdit = await models.Video.update(req.body, {
      where: {
        id: Number(req.params.id),
      },
      returning: true,
      plain: true,
    });

    data = {
      videos,
      video,
    };

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.get("/channel/:id", async function (req, res, next) {
  try {
    const checkUser = await models.User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!checkUser) return res.status(500).json({ err: "channel not found!" });

    const user = await models.User.findOne({
      where: {
        id: req.params.id,
      },
    });

    const videos = await models.Video.findAll({
      include: [
        {
          model: models.User,
          attributes: ["id", "email", "firstname", "lastname", "createdAt"],
        },
      ],
      order: [["createdAt", "DESC"]],
      where: {
        UserId: req.params.id,
        title: {
          [Op.like]: `%${req.query.searchVideo ? req.query.searchVideo : ""}%`,
        },
      },
    });

    data = {
      user,
      videos,
    };

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.post("/add", helpers.isLoggedIn, async function (req, res, next) {
  try {
    let thumbnailUrl = uuidv4() + req.files.imagesFile.name;
    let videoUrl = uuidv4() + req.files.videoFile.name;

    let imagesFiles = req.files.imagesFile;
    let videoFiles = req.files.videoFile;
    imagesFiles.mv(
      __dirname + "/../public/images/thumbnail/" + thumbnailUrl,
      function (err) {
        if (err) {
          throw err;
        }
      }
    );

    videoFiles.mv(__dirname + "/../public/video/" + videoUrl, function (err) {
      if (err) {
        throw err;
      }
    });

    req.body.UserId = req.body.userToken.userId;
    req.body.thumbnail = thumbnailUrl;
    req.body.UrlVideo = videoUrl;

    const video = await models.Video.create(req.body);
    res.status(201).json(video);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.get("/edit/:id", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const video = await models.Video.findOne({
      where: {
        UserId: req.body.userToken.userId,
        id: Number(req.params.id),
      },
    });

    if (!video) return res.status(500).json({ err: "video not found!" });

    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.put("/edit/:id", helpers.isLoggedIn, async function (req, res, next) {
  try {
    if (req.files) {
      let thumbnailUrlEdit = uuidv4() + req.files.imagesFile.name;
      let imagesFilesEdit = req.files.imagesFile;

      if (req.body.imagesFileHidden.includes("deleted")) {
        fs.unlinkSync(
          __dirname +
            "/../public/images/thumbnail/" +
            `${req.body.imagesFileHidden.split("#*#").shift()}`
        );
      }

      imagesFilesEdit.mv(
        __dirname + "/../public/images/thumbnail/" + thumbnailUrlEdit,
        function (err) {
          if (err) {
            throw err;
          }
        }
      );

      req.body.thumbnail = thumbnailUrlEdit;
    }

    const video = await models.Video.update(req.body, {
      where: {
        UserId: req.body.userToken.userId,
        id: Number(req.params.id),
      },
      returning: true,
      plain: true,
    });
    res.status(201).json(video[1]);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete(
  "/delete/:id",
  helpers.isLoggedIn,
  async function (req, res, next) {
    try {
      const getVideo = await models.Video.findOne({
        where: {
          UserId: req.body.userToken.userId,
          id: Number(req.params.id),
        },
      });

      fs.unlinkSync(
        __dirname +
          "/../public/images/thumbnail/" +
          getVideo.dataValues.thumbnail
      );

      fs.unlinkSync(
        __dirname + "/../public/video/" + getVideo.dataValues.UrlVideo
      );

      const video = await models.Video.destroy({
        where: {
          UserId: req.body.userToken.userId,
          id: Number(req.params.id),
        },
      });

      res.status(201).json(video);
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

router.get("/like/:id", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const videoLike = await models.Video.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!videoLike) return res.status(500).json({ err: "video not found!" });

    req.body.likes = [];

    if (videoLike.dataValues.likes.length == 0) {
      if (req.query.likes) {
        req.body.likes.push(Number(req.query.likes));
      }
    } else {
      req.body.likes = [...videoLike.dataValues.likes];
      videoLike.dataValues.likes.forEach((m) => {
        if (Number(m) != req.body.userToken.userId && req.query.likes) {
          req.body.likes.push(Number(req.query.likes));
        }
      });
    }

    req.body.dislikes = [];

    if (videoLike.dataValues.dislikes.length == 0) {
      if (req.query.dislikes) {
        req.body.dislikes.push(Number(req.query.dislikes));
      }
    } else {
      req.body.dislikes = [...videoLike.dataValues.dislikes];
      videoLike.dataValues.dislikes.forEach((m) => {
        if (Number(m) != req.body.userToken.userId && req.query.dislikes) {
          req.body.dislikes.push(Number(req.query.dislikes));
        }
      });
    }

    const videoEdit = await models.Video.update(req.body, {
      where: {
        id: Number(req.params.id),
      },
      returning: true,
      plain: true,
    });

    res.json(videoLike);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

module.exports = router;
