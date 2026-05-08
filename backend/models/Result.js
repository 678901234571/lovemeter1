const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  boyName: { type: String, required: true },
  girlName: { type: String, required: true },
  score: { type: Number, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
