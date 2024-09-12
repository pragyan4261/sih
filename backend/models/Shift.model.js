const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  location: { type: String, required: true },
  foreman_name: { type: String, required: true },
});

module.exports = mongoose.model('Shift', shiftSchema);
