var express = require('express');
var router = express.Router();
const Event = require("../models/Event");


router.get("/", (req, res) => {
  
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

module.exports = router;