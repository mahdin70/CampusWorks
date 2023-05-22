const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserProfileSchema = new Schema({
    useremail: {type:String,required:true},
    Bio: {type:String},
    Result: {type:String},
    Experience: {
        type: String },
    Strength: { type: String },
    Education:{type: String},
    Achievements:  {type: String},
    photo:{type: String}
        

  });
  
module.exports = mongoose.model('UserProfile', UserProfileSchema);