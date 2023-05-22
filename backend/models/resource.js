const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  resourceName: {
    type: String,
    required: true,
  },
  resourceDomain: {
    type: String,
    required: true,
  },
  resourceDescription: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

  
module.exports = mongoose.model('Resource', resourceSchema);