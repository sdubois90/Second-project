const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true
  },

  menu: {
    starter: {
      type: String
    },
    main: {
      type: String,
      required: true
    },
    dessert: {
      type: String
    }
  },

  type: {
    type: String,
    enum: ["breakfast", "brunch", "lunch", "dinner"],
    required: true
  },

  dateOfEvent: Date,

  location: {
    street: String,
    city: String
  },

  maxPeople: {
    type: Number,

    required: true

  },

  pricePP: {
    type: Number,
    required: true
  },

  theme: String,
  
  information:String,

  imgName: String,
  imgPath: { type: String, default: "./images/default_event.PNG"},

  chef: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  
  restrictions: [{
    type: Schema.Types.ObjectId,
    ref: "Tag"
  }],

  guests: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]

});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;