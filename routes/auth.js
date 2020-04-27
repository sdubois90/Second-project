const express = require("express");
const router = new express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')

const bcryptSalt = 10;

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post('/signup', (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.findOne({
            'email': email
        })
        .then((dbResult) => {
            if (dbResult !== null) {
                res.render('signup', {
                    errorMessage: 'This email is already used'
                });
                return
            }
            if (firstName === '' || lastName === '' || email === '' || password === '') {
                res.render('signup', {
                    errorMessage: 'Some ingredients are missing :)'
                });
                return
            }
            User.create({
                    firstName,
                    lastName,
                    email,
                    password: hashPass,
                })
                .then(() => {
                    res.redirect('/')
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((error) => {
            next(error)
        })

});

router.get("/login", (req, res) => {
    res.render("login");
})

router.post('/login', (req, res, next) => {

    const theEmail = req.body.email;
    const thePassword = req.body.password;

    if (theEmail === '' || thePassword === '') {
        res.render('login', {
            errorMessage: 'Fill all the fields...'
        });
        return
    }

    User.findOne({
            'email': theEmail
        })

        .then((dbResult) => {

            if (!dbResult) {
                res.render('login', {
                    errorMessage: "We can't find you "
                });
                return
            }

            if (bcrypt.compareSync(thePassword, dbResult.password)) {
                req.session.currentUser = dbResult
                res.redirect('/')
            } else {
                res.render('login', {
                    errorMessage: "We can't find you"
                })
            }
        })
        .catch((error) => {
            next(error)
        })
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    })
})

module.exports = router;