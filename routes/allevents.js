var express = require('express');
var router = express.Router();
const Event = require("../models/Event");
const User = require("../models/User");
const Tag = require("../models/Tag");

router.get("/allevents", (req, res) => {


  // //  Promise.all https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  // /** We need all the sneakers (filtered or not by the query) and all the tags our view. */
  // Promise.all([Sneaker.find(query).populate("id_tags"), Tag.find({})])
  //   .then((results) => {
  //     res.render("products", {
  //       sneakers: results[0], // Result of 1st promise passed to Promise.all
  //       category: cat,
  //       tags: results[1], // Result of 2nd promise passed to Promise.all
  //       scripts: ["filter.js"], // Script to handle http requests made with ajax for filtering by tags.

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  Promise.all([Event.find({}).populate("restrictions"), Tag.find({})])
    .then((dbResult) => {
      res.render("all-events", {
        allEvents: dbResult[0], // result of the first promise
        tags: dbResult[1],      // result of the second promise


        // type: dbResult[0].type,
        styles: ["allevents.css"],
        scripts: ["filter.js"],
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    })
});


/** For AJAX
* This router handles ajax requests.
**/
router.get("/api/allevents", (req, res, next) => {
  const query = {};
  if (req.query.tags && req.query.tags.length) {
    query.restrictions = { $in: req.query.tags };
  }
  console.log(query)
  Event.find(query)  // Event.find({restritions:{$in: req.query.tags}})
    .populate("restrictions")
    .then((dbResult) => {
      console.log(dbResult)
      res.status(200).json(dbResult);
    })
    .catch((dbErr) => {
      res.status(500).json(dbErr);
    });
});






router.get("/event/:id", (req, res) => {

  Event.findById(req.params.id)
    .populate("chef")
    .populate("guests")

    // Trying to display the names of the restrictions and not just the IDs
    .populate("restrictions")

    .then((dbResult) => {
      console.log(dbResult)
      let isTheChef = false;
      // console.log(typeof req.session.currentUser._id, typeof dbResult.chef._id)
      if (req.session.currentUser) {
        if (req.session.currentUser._id === dbResult.chef._id.toString()) {
          isTheChef = true;
        }
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
          res.redirect('/managepage');
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