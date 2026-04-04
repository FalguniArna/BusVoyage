const mongoose = require('mongoose');

const VerifiedStudentSchema = new mongoose.Schema({
    studentID: { type: String, required: true, unique: true }, // e.g., "231-115-207"
    phone: { type: String, required: true } // e.g., "017XXXXXXXX"
});

module.exports = mongoose.model('VerifiedStudent', VerifiedStudentSchema);