const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

router.get('/student/:studentId', async (req, res) => {
  try {
    const complaints = await Complaint.find({
      studentId: req.params.studentId
    }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/', async (req, res) => {
  try {
    const { studentId, studentName, message } = req.body;
    const complaint = new Complaint({ studentId, studentName, message });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch('/:id/reply', async (req, res) => {
  try {
    const { adminReply, status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { adminReply, status },
      { new: true }
    );
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;