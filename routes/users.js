var express = require('express');
var router = express.Router();
const User = require('../models/User')
const Tag = require('../models/Tag')
const upload = require("../config/cloudinary");

// router.get('/myprofile', (req, res) => {
//   console.log(req.session.currentUser)
//   let user = req.session.currentUser
//   res.render('edit_profile', {
//     user:user
//   });
// });

router.get('/myprofile', (req, res) => {
  Tag.find({})
    .then((dbresult) => {
      res.render('edit_profile', {
        tags: dbresult
      });
    })
    .catch((err) => {
      console.log(err)
    })
});

router.post('/myprofile', upload.single("profilePicturePath"),(req, res) => {
  let modifiedUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: {
      street: req.body.street,
      city: req.body.city,
    },
    description: req.body.description,
    restrictions: req.body.restrictions
  };
  if (req.file) {
    console.log(req.file)
    modifiedUser.profilePicturePath = req.file.secure_url;
  }
  console.log(modifiedUser)
  User.findOneAndUpdate(req.params.id, modifiedUser, { new: true, useFindAndModify: true })
    .then((dbresult) => {
      req.session.currentUser=dbresult
      res.redirect("/myprofile")
    })
    .catch((err) => {
    console.log(err)
  })
})

module.exports = router;