const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  availableTimes: [{ type: String }]
});

module.exports = mongoose.model('Doctor', doctorSchema);