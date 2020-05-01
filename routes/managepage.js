var express = require('express');
var router = express.Router();
const Event = require("../models/Event");
const User = require("../models/User");
const Tag = require("../models/Tag");
const requireAuth = require("../middlewares/requireAuth");
const upload = require("../config/cloudinary");

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

// Cancelling as a host
router.get("/manage-delete/:id", requireAuth, (req, res) => {

  Event.findByIdAndDelete(req.params.id)
    .then((dbResult) => {
      res.redirect("/managepage");
    })
    .catch(dbErr)
});

// Cancelling as a guest
router.post('/managepage/:id/deleteGuest', (req, res) => {
  Event.findByIdAndUpdate(req.params.id, {
      $pull: {
        guests: req.session.currentUser._id
      }
    }, {
      new: true,
      useFindAndModify: false
    })
    .then(dbResult => {
      console.log(dbResult);
      res.redirect('/managepage');
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

router.get('/myevent/edit/:id', (req, res) => {
  Promise.all([Event.findById(req.params.id).populate("restrictions"), Tag.find({})])
    .then(dbResult => {
      res.render('edit_event.hbs', {
        event: dbResult[0],
        tags: dbResult[1],
        styles: ["edit_event.css"],
      })
    })
    .catch(dbError => {
      console.log(dbError);
    });
});

// router.get('/myevent/edit/:id', (req, res) => {
//   Event.findById(req.params.id)
//     .then(dbResult => {
//       res.render('edit_event.hbs', {
//         event: dbResult,
//         styles:["edit_event.css"],
//       })
//     })
//     .catch(dbError => {
//       console.log(dbError);
//     });
// });

router.post("/myevent/edit/:id", requireAuth, upload.single("imgPath"), (req, res) => {
  let modifiedEvent = {
    eventName: req.body.eventName,
    type: req.body.type,
    menu: {
      starter: req.body.starter,
      main: req.body.main,
      dessert: req.body.dessert
    },
    dateOfEvent: req.body.date,
    location: {
      street: req.body.street,
      city: req.body.city
    },
    maxPeople: req.body.peopleNumber,
    pricePP: req.body.price,
    theme: req.body.theme,
    information: req.body.information,
    restrictions: req.body.restrictions
  };
  if (req.file) {
    console.log(req.file)
    modifiedEvent.imgPath = req.file.secure_url;
  }
  Event.findOneAndUpdate(req.params.id, modifiedEvent, {
      new: true,
      useFindAndModify: true
    })
    .then((dbResult) => {
      res.redirect("/managepage")
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router;