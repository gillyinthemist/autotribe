const mongoose = require('./../db.js');

const vehicleSchema = mongoose.Schema({
  vrm: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
    required: true,
  },
  imageURLs: [{
    type: String,
  }],
  description: {
    type: String,
  },
  current: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
