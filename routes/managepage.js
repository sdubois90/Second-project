var express = require('express');
var router = express.Router();
const Event = require("../models/Event");
const User = require("../models/User");
const requireAuth = require("../middlewares/requireAuth");

router.get("/managepage", requireAuth, (req, res) => {
  
    Event.find({ })
      .then((dbResult) => {
    console.log(dbResult);
        res.render("manage-page", {
          allEvents: dbResult,
        });
      })
      .catch((dbErr) => {
        console.log(dbErr);
      });
  });

router.get("/manage-edit/:id", requireAuth, (req, res) => {

    Event.find().then((dbResultEvents) => {
        User.findById(req.params.id)
        .populate("User")
        .then((dbResult) => {
            
            res.render("/manage-page", {
                events: dbResultEvents,
                users: dbResult,
            });
        })
        .catch((dbErr) => {
            console.log(dbErr)
    });
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