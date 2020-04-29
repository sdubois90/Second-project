var express = require('express');
var router = express.Router();
const Event = require("../models/Event");


router.get("/allevents", (req, res) => {
  
    Event.find({ })
      .then((dbResult) => {
    console.log(dbResult);
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
    .populate("User")
    .then((dbResult) =>{
      res.render("one-event", { 
        event: dbResult,
       })
    })
    .catch((dbErr) => {
      console.log(dbErr);
    })
  
  });

module.exports = router;