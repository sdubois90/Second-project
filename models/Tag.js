const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    restrictions: {type:String, unique:true},
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;