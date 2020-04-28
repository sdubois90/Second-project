const express = require("express");
const router = new express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')


router.get('/create-event', (req, res, next) => {
    res.render('create-event.hbs', {
        styles: ['create.css']
    });
})



module.exports = router;