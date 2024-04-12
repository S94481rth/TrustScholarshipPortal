const mongoose = require('mongoose');
const env = require('../env.json')
const sessionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  sessionId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: env.expiry // TTL in seconds (1 hour in this example)
  }
});

// Create the TTL index
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
