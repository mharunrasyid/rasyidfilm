var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET comments listing. */
router.get('/', async function (req, res, next) {
    try {
        const comments = await models.Comment.findAll({
            include: [
                { model: models.User },
                { model: models.Video }
            ]
        });
        res.json(comments)
    } catch (err) {
        res.status(500).json({ err })
    }
});

router.post('/add', async function (req, res, next) {
    try {
        const comment = await models.Comment.create(req.body);
        res.status(201).json(comment)
    } catch (err) {
        res.status(500).json({ err })
    }
});

router.put('/edit/:id', async function (req, res, next) {
    try {
        const comment = await models.Comment.update(req.body, {
            where: {
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

router.delete('/delete/:id', async function (req, res, next) {
    try {
        const comment = await models.Comment.destroy({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(201).json(comment)
    } catch (err) {
        res.status(500).json({ err })
    }
});

module.exports = router;
