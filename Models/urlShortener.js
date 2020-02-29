const mongoose = require('mongoose');
const urlShcema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: Math.random().toString(36)
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
});

urlShcema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('url', urlShcema);