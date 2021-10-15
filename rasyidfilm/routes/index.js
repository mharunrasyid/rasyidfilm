var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/watch/:id', function(req, res, next) {
  res.render('watch/view');
});

router.get('/channel/:id', function(req, res, next) {
  res.render('channel/view');
});

router.get('/studio/:id', function(req, res, next) {
  res.render('studio/list');
});

router.get('/studio/:id/add', function(req, res, next) {
  res.render('studio/form-add');
});

router.get('/studio/:id/edit/:idVideo', function(req, res, next) {
  res.render('studio/form-edit');
});

module.exports = router;
