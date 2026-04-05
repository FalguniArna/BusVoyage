const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  busNumber: { type: String, default: "" },
  route: { type: String, default: "" },
  dateLost: { type: String, required: true },
  contact: { type: String, required: true },
  status: {
    type: String,
    enum: ['Lost', 'Found', 'Returned'],
    default: 'Lost'
  },
}, { timestamps: true });

module.exports = mongoose.model('LostFound', lostFoundSchema);