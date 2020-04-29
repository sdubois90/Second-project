var express = require('express');
var router = express.Router();
const Event = require("../models/Event");
const User = require("../models/User");
const requireAuth = require("../middlewares/requireAuth");

router.get("/managepage", requireAuth, (req, res) => {
  

    Event.find({
        $or: [{
          chef: req.session.currentUser._id
        }, {
          guests: req.session.currentUser._id
        }]
      })
      .populate("chef")
      .then((dbResult) => {
        let allEvents = dbResult
        let guestEvents = [];
        let hostEvents = [];
        for (let index = 0; index < allEvents.length; index++) {
          if (allEvents[index].chef._id.toString() === req.session.currentUser._id) {
            hostEvents.push(allEvents[index])
          } else if (allEvents[index].guests.includes(req.session.currentUser._id)) {
            guestEvents.push(allEvents[index])
          }
        }

        console.log(hostEvents);
        console.log(guestEvents);
        res.render("manage-page", {
          guestEvents: guestEvents,
          hostEvents: hostEvents
        });
      })
      .catch((dbErr) => {
        console.log(dbErr);
      });
    });


  
// router.get("/manage-delete/:id", (req, res) => {
 
//     Event.findByIdAndDelete(req.params.id)

//       .then((dbResult) => {
//         res.redirect("/manage-page");
//       })
//       .catch((dbErr) => {
//         console.log(dbErr);
//       });
//   });


module.exports = router;