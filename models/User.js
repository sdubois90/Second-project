const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  dateOfBirth: Date,
  address: {
    street: String,
    city: String
},
  description: String,
  
  profilePictureName: String,
  profilePicturePath: { type: String, default: "./images/default_user.PNG" },
  
  restrictions: { type: Schema.Types.ObjectId, ref: "Tag" }

});

const User = mongoose.model("User", userSchema);

module.exports = User;