'use strict';

var express = require('express');
var controller = require('./participation.controller');

var router = express.Router();

// router.get('/', controller.index);
router.post('/', controller.create);

module.exports = router;
