var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET videos listing. */
router.get('/', async function (req, res, next) {
    try {
        const videos = await models.Video.findAll({ include: models.User });
        res.json(videos)
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
});

router.post('/add', async function (req, res, next) {
    try {
        const video = await models.Video.create(req.body);
        res.status(201).json(video)
    } catch (err) {
        res.status(500).json({ err })
    }
});

router.put('/edit/:id', async function (req, res, next) {
    try {
        const video = await models.Video.update(req.body, {
            where: {
                id: Number(req.params.id)
            },
            returning: true,
            plain: true
        });
        res.status(201).json(video[1])
    } catch (err) {
        res.status(500).json({ err })
    }
});

router.delete('/delete/:id', async function (req, res, next) {
    try {
        const video = await models.Video.destroy({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(201).json(video)
    } catch (err) {
        res.status(500).json({ err })
    }
});

module.exports = router;

