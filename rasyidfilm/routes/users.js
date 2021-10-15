var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const users = await models.User.findAll();
    res.json(users)
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.post('/add', async function (req, res, next) {
  try {
    const user = await models.User.create(req.body);
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.put('/edit/:id', async function (req, res, next) {
  try {
    const user = await models.User.update(req.body, {
      where: {
        id: Number(req.params.id)
      },
      returning: true,
      plain: true
    });
    res.status(201).json(user[1])
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.delete('/delete/:id', async function (req, res, next) {
  try {
    const user = await models.User.destroy({
      where: {
        id: Number(req.params.id)
      }
    });
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ err })
  }
});

module.exports = router;
