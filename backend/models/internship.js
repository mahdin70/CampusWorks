const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const internshipSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  positionName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  internshipDomain: {
    type: String,
    required: true,
  },
  applyMedium: {
    type: String,
    required: true,
  },
  lastDateToApply: {
    type: Date,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Internship', internshipSchema);
