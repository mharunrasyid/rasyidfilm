var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET comments listing. */
router.get('/:idVideo', async function (req, res, next) {
    try {
        const comments = await models.Comment.findAll({
            include: [
                { model: models.User, attributes: ['id', 'email','firstname' ,'lastname', 'createdAt'] },
                { model: models.Video }
            ],where: {
              VideoId: req.params.idVideo,
            },
        });
        res.json(comments)
    } catch (err) {
        res.status(500).json({ err })
    }
});

router.post('/:idVideo/add', async function (req, res, next) {
    try {
        const comment = await models.Comment.create(req.body);
        res.status(201).json(comment)
    } catch (err) {
        res.status(500).json({ err })
    }
});

router.put('/:idVideo/edit/:id', async function (req, res, next) {
    try {
        const comment = await models.Comment.update(req.body, {
            where: {
                VideoId: req.params.idVideo,
                id: Number(req.params.id)
            },
            returning: true,
            plain: true
        });
        res.status(201).json(comment[1])
    } catch (err) {
        res.status(500).json({ err })
    }
});

router.delete('/:idUser/delete/:id', async function (req, res, next) {
    try {
        const comment = await models.Comment.destroy({
            where: {
                VideoId: req.params.idVideo,
                id: Number(req.params.id)
            }
        });
        res.status(201).json(comment)
    } catch (err) {
        res.status(500).json({ err })
    }
});

module.exports = router;
