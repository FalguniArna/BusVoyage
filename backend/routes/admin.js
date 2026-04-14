const express = require('express');
const router = express.Router();
const User = require('../models/User');
const PreRegisteredStudent = require('../models/PreRegisteredStudent');
const bcrypt = require('bcryptjs');

// GET all pre-registered students
router.get('/students', async (req, res) => {
  try {
    const students = await PreRegisteredStudent.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST add new pre-registered student
router.post('/students', async (req, res) => {
  try {
    const student = new PreRegisteredStudent(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: "Student already exists or invalid data" });
  }
});

// DELETE pre-registered student
router.delete('/students/:id', async (req, res) => {
  try {
    await PreRegisteredStudent.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── DRIVERS ──

// GET all drivers
router.get('/drivers', async (req, res) => {
  try {
    const drivers = await User.find({ role: 'driver' }).select('-password');
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST add new driver
router.post('/drivers', async (req, res) => {
  try {
    const { username, password, name } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: "Username already taken" });
    const hashed = await bcrypt.hash(password, 10);
    const driver = new User({ username, password: hashed, name, role: 'driver' });
    await driver.save();
    res.status(201).json({ message: "Driver created", driver: { username, name } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE driver
router.delete('/drivers/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;