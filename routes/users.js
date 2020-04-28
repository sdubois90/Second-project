var express = require('express');
var router = express.Router();
const User = require('../models/User')
const Tag = require('../models/Tag')

// router.get('/myprofile', (req, res) => {
//   console.log(req.session.currentUser)
//   let user = req.session.currentUser
//   res.render('edit_profile', {
//     user:user
//   });
// });

router.get('/myprofile', (req, res) => {
  res.render('edit_profile');
});

module.exports = router;
