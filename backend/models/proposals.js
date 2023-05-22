const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proposalSchema = new Schema({
    senderEmail: {
        type: String,
        required: true,
    },
    receiverEmail: {
        type: String,
        required: true,
    },
    jobId: {
        type: String,
        required: true,
    },
    proposedPrice: {
        type: Schema.Types.Decimal128,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    coverLetter: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
});

proposalSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.proposedPrice = ret.proposedPrice.toString();
      return ret;
    },
  });
module.exports = mongoose.model('Proposals', proposalSchema);