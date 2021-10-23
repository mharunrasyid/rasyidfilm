var express = require("express");
var router = express.Router();
var models = require("../models");
const helpers = require("../helpers/util");

/* GET comments listing. */
router.get("/:idVideo", async function (req, res, next) {
  try {
    const comments = await models.Comment.findAll({
      include: [
        {
          model: models.User,
          attributes: ["id", "email", "firstname", "lastname", "createdAt"],
        },
        { model: models.Video },
      ],
      order: [["createdAt", "DESC"]],
      where: {
        VideoId: req.params.idVideo,
      },
    });

    const totalComments = await models.Comment.findAll({
      include: [
        {
          model: models.User,
          attributes: ["id", "email", "firstname", "lastname", "createdAt"],
        },
        { model: models.Video },
      ],
      where: {
        VideoId: req.params.idVideo,
      },
    });

    let data = {
        comments,
        totalComments
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ err : "Terjadi Kesalahan" });
  }
});

router.post(
  "/:idVideo/add",
  helpers.isLoggedIn,
  async function (req, res, next) {
    try {
      req.body.UserId = req.body.userToken.userId;
      req.body.VideoId = Number(req.params.idVideo);

      const comment = await models.Comment.create(req.body);
      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ err : "Terjadi Kesalahan" });
    }
  }
);

// router.put('/:idVideo/edit/:id', async function (req, res, next) {
//     try {
//         const comment = await models.Comment.update(req.body, {
//             where: {
//                 VideoId: req.params.idVideo,
//                 id: Number(req.params.id)
//             },
//             returning: true,
//             plain: true
//         });
//         res.status(201).json(comment[1])
//     } catch (err) {
//         res.status(500).json({ err })
//     }
// });

router.delete(
  "/delete/:id",
  helpers.isLoggedIn,
  async function (req, res, next) {
    try {
      const comment = await models.Comment.destroy({
        where: {
          UserId: req.body.userToken.userId,
          id: Number(req.params.id),
        },
      });
      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ err : "Terjadi Kesalahan" });
    }
  }
);

module.exports = router;
