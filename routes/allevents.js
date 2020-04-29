var express = require('express');
var router = express.Router();
const Event = require("../models/Event");
const User = require("../models/User");

router.get("/allevents", (req, res) => {
  
    Event.find({ })
      .then((dbResult) => {
        res.render("all-events", {
          allEvents: dbResult,
        });
      })
      .catch((dbErr) => {
        console.log(dbErr);
      });
  });

router.get("/event/:id", (req, res) => {
  
  Event.findById(req.params.id)
    .populate("chef")
    .populate("guests")
    .then((dbResult) => {
      console.log(dbResult)
      let isTheChef = false;
      console.log(typeof req.session.currentUser._id, typeof dbResult.chef._id)
      if (req.session.currentUser._id === dbResult.chef._id.toString()) {
        isTheChef = true;
      }
console.log(isTheChef)
      res.render("one-event", {
        event: dbResult,
        isTheChef: isTheChef
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});
  

router.post('/event/:id', (req, res) => {
  console.log(req.session.currentUser._id) // user id
  console.log(req.params.id); // event id

  Event.findById(req.params.id)
    .then(dbResult => {
      if (dbResult.guests.includes(req.session.currentUser._id)) {
        req.session.msg = "You are already in this event"
        res.redirect(`/event/${req.params.id}`)
        return
      }

      Event.findByIdAndUpdate(req.params.id, { $addToSet: { guests: req.session.currentUser._id } }, { new: true, useFindAndModify: false })
        .then(dbResult => {
          console.log(dbResult);
          res.redirect('/');
        })
        .catch(dbErr => {
          console.log(dbErr);
        });
    })
    .catch(dbErr => {
    console.log(dbErr)
  })
});


module.exports = router;