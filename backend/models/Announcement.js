const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  postedBy: { type: String, default: "Admin" },
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);