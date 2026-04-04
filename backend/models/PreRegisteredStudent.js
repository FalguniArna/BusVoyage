const mongoose = require('mongoose');

const preRegisteredStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  isRegistered: { type: Boolean, default: false }
});

module.exports = mongoose.model('PreRegisteredStudent', preRegisteredStudentSchema);