var express = require('express');
var router = express.Router();
const uploadCloud = require('../config/cloudinary.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Perfectly Food',
    styles: ["index.css"]
  });
});

module.exports = router;