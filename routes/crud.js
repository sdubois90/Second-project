const express = require("express");
const router = new express.Router();
const bcrypt = require('bcrypt');
const uploadCloud = require('../config/cloudinary.js');
var createError = require('http-errors');
const User = require('../models/User');
const Event = require('../models/Event');
const Tag = require('../models/Tag');
const requireAuth = require("../middlewares/requireAuth");

router.get('/my-events', requireAuth, (req, res) => {
    Event.find({})
        .then(dbResult => {
            res.render('my-events.hbs', {
                events: dbResult
            });
        })
        .catch(dbErr => {
            console.log(dbErr);
        });
});



router.get('/create-event', requireAuth, (req, res) => {
    res.render('create-event.hbs', {
        styles: ['create.css']
    });
});

router.post('/create-event', requireAuth, uploadCloud.single('image'), (req, res) => {
    Event.find({})
        .then(dbResult => {
            const {
                name,
                type,
                starter,
                main,
                dessert,
                date,
                street,
                city,
                peopleNumber,
                price,
                theme,
                information
            } = req.body;

            const newEvent = {
                chef: req.session.currentUser,
                eventName:name,
                type,
                menu: {starter:starter, main:main, dessert:dessert},
                dateOfEvent:date,
                location: {street:street, city:city},
                maxPeople:peopleNumber,
                pricePP:price,
                theme,
                information
            }
            console.log(req.session.currentUser)

            // Besoin de vérifier si req.file pour ajouter à newEneaker,
            // c'est pour ça qu'on ne fait pas directement un Event.create(req.body)
            if (req.file) {
                newEvent.imgPath = req.file.secure_url;
                newEvent.imgName = req.file.originalName;
            }
    
            Event.create(newEvent)
                
                .then(dbResult => {
                    res.redirect('/managepage')
                })
                .catch(dbErr => {
                    console.log(dbErr);
                    createError(404);
                });
        })
        .catch(dbErr => {
            console.log(dbErr);
            createError(404);
        });
});



module.exports = router;