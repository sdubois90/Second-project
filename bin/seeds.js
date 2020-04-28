  require("dotenv").config();
  const mongoose = require("mongoose");
  // const User = require("../models/User");
  const Event = require("../models/Event");
  // const Tag = require("../models/Tag");

  // const tags = [
  //   {
  //     restrictions: "Vegetarian"
  //   },
  //   {
  //     restrictions: "Vegan"
  //   },
  //   {
  //     restrictions: "Gluten free"
  //   },
  //   {
  //     restrictions: "Halal"
  //   },
  //   {
  //     restrictions: "Egg free"
  //   },
  //   {
  //     restrictions: "Meat only"
  //   },
  // ];

  // const users = [
  //   {
  //     firstName: "Nelly",
  //     lastName: "Nelly",
  //     email: "nelly@gmail.com",
  //     password: "12345",
  //     dateOfBirth: "",
  //     address: {
  //       street: "Sreet Name 1",
  //       city: "Paris"
  //     },
  //     description: "Awesome chef who loves cooking and entertaining.",
  //     // restrictions: ["Vegetarian"],
  //     profilePicturePath: "./images/default_user.PNG",
  //   },
  //   {
  //     firstName: "Sebastien",
  //     lastName: "Sebastien",
  //     email: "seb@gmail.com",
  //     password: "67890",
  //     dateOfBirth: "",
  //     address: {
  //       street: "Sreet Name 2",
  //       city: "Paris"
  //     },
  //     description: "Incredible chef who loves cooking and entertaining.",
  //     // restrictions: ["Vegan"],
  //     profilePicturePath: "./images/default_user.PNG",
  //   },
  //   {
  //     firstName: "Anne",
  //     lastName: "Anne",
  //     email: "anne@gmail.com",
  //     password: "abcde",
  //     dateOfBirth: "",
  //     address: {
  //       street: "Sreet Name 3",
  //       city: "Paris"
  //     },
  //     description: "Genius chef who loves cooking and entertaining.",
  //     // restrictions: ["Halal"],
  //     profilePicturePath: "./images/default_user.PNG",
  //   },
  //   {
  //     firstName: "Franck",
  //     lastName: "Franck",
  //     email: "franck@gmail.com",
  //     password: "fghlm",
  //     dateOfBirth: "",
  //     address: {
  //       street: "Sreet Name 4",
  //       city: "Paris"
  //     },
  //     description: "Brilliant chef who loves cooking and entertaining.",
  //     // restrictions: ["Meat only"],
  //     profilePicturePath: "./images/default_user.PNG",
  //   },
  //   {
  //     firstName: "Tatijana",
  //     lastName: "Tatijana",
  //     email: "tati@gmail.com",
  //     password: "nopqrs",
  //     dateOfBirth: "",
  //     address: {
  //       street: "Sreet Name 5",
  //       city: "Paris"
  //     },
  //     description: "World famous chef who loves cooking and entertaining.",
  //     // restrictions: ["Egg free"],
  //     profilePicturePath: "./images/default_user.PNG",
  //   },
  //   {
  //     firstName: "Nina",
  //     lastName: "Nina",
  //     email: "nina@gmail.com",
  //     password: "tuvxyz",
  //     dateOfBirth: "",
  //     address: {
  //       street: "Sreet Name 6",
  //       city: "Paris"
  //     },
  //     description: "Super chef who loves cooking and entertaining.",
  //     // restrictions: ["Gluten free"],
  //     profilePicturePath: "./images/default_user.PNG",
  //   },
  //   {
  //     firstName: "Jamie",
  //     lastName: "Jamie",
  //     email: "philippe@gmail.com",
  //     password: "fghlm",
  //     dateOfBirth: "",
  //     address: {
  //       street: "Sreet Name 6",
  //       city: "Paris"
  //     },
  //     description: "Brilliant chef who loves cooking and entertaining.",
  //     profilePicturePath: "./images/default_user.PNG",
  //   },
  // ];

  const events = [
    {
    eventName: "Dinner with Nelly",

    // chef: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User"
    // },
    menu: {
      starter: "Velouté de champignons",
      main: "Risotto au safran de Sardaigne, légumes de saison",
      dessert: "La crème brûlée",
    },
    type: "dinner",
    //   dateOfEvent: Date,
    location: {
      street: "Sreet Name 1",
      city: "Paris"
    },
    maxPeople: 5,
    pricePP: 50,
    theme: "Dinner in the dark",

    imgName: "Nelly the Chef",
    imgPath: "./images/default_event.PNG",

    // restrictions: ["Vegetarian", "Gluten free"],
    //   guests: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
  }, 
  {
  eventName: "Brunch with Nelly",

    // chef: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User"
    // },
    menu: {
      starter: "---",
      main: "Blueberry plush pancakes, warm maple syrup, chocolate croissants, espresso shots, strawberry/basil waffles, eggs, pomegranate muffins, watermelon",
      dessert: "---",
    },
    type: "brunch",
      // dateOfEvent: Date,
    location: {
      street: "Sreet Name 1",
      city: "Paris"
    },
    maxPeople: 5,
    pricePP: 50,
    theme: "Brunch for the hangovers",

    imgName: "Nelly the Chef",
    imgPath: "./images/default_event.PNG",

    // restrictions: ["Vegetarian", "Gluten free"],
      // guests: {
      //   type: Schema.Types.ObjectId,
      //   ref: "User"
  }, 
  {
  eventName: "Dinner with Sebastien",
    // chef: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User"
    // },
    menu: {
      starter: "Tartine crue avocat, citron vert",
      main: "Aiguillettes de seitan marinées",
      dessert: "Dôme mangue sauvage, vanille de tahiti et ylang-ylang",
    },
    type: "dinner",
      // dateOfEvent: Date,
    location: {
      street: "Sreet Name 2",
      city: "Paris"
    },
    maxPeople: 5,
    pricePP: 50,
    theme: "Dinner dinner dinner",

    imgName: "Sebastien le Chef",
    imgPath: "./images/default_event.PNG",

    // restrictions: ["Vegetarian", "Gluten free"],
    //   guests: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
  }, 
  {
  eventName: "Lunch with Anne",
    // chef: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User"
    // },
    menu: {
      starter: "Sashimi de saumon accompagné de ses pomme grenailles à la vapeur, sauce du chef",
      main: "Noix de veau, sauce aux morilles",
      dessert: "Tiramisu à la mangue du chef",
    },
    type: "lunch",
    //   dateOfEvent: Date,
    location: {
      street: "Sreet Name 3",
      city: "Paris"
    },
    maxPeople: 5,
    pricePP: 50,
    theme: "Luuunch",

    imgName: "Anne the Chef",
    imgPath: "./images/default_event.PNG",

    // restrictions: ["Vegetarian", "Gluten free"],
  //     guests: {
  //       type: Schema.Types.ObjectId,
  //       ref: "User"
  // }, 
  },
];

  mongoose
    .connect("mongodb://localhost/perfectlyFood", {
      useNewUrlParser: true
    })
    .then((self) => {
      console.log(`Connected to ${self.connection.name}`);

      // Seeds
      Event.create(events)
        .then((dbResponse) => {
          console.log(dbResponse);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(`Error occured while connecting to the Database ${err}`);
    });
