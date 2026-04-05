const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Resolved'],
    default: 'Pending'
  },
  adminReply: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);