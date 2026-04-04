const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentID: { type: String, required: true, unique: true },
    phone: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' } // 'student', 'driver', 'admin'
}, { timestamps: true }); // This adds "createdAt" and "updatedAt" automatically

module.exports = mongoose.model('User', UserSchema);