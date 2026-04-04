const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PreRegisteredStudent = require('../models/PreRegisteredStudent');

// STEP 1 OF REGISTER — verify student identity
router.post('/verify-student', async (req, res) => {
  const { name, studentId, phone } = req.body;
  console.log("Received:", { name, studentId, phone });

  try {
    const student = await PreRegisteredStudent.findOne({
      name: name.trim(),
      studentId: studentId.trim(),
      phone: phone.trim()
    });

    if (!student) {
      return res.status(404).json({
        message: "No student found with these details. Please check your information."
      });
    }

    if (student.isRegistered) {
      return res.status(400).json({
        message: "An account already exists for this student. Please login instead."
      });
    }

    res.status(200).json({
      message: "Identity verified! Please create your username and password.",
      studentId: student.studentId,
      name: student.name
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// STEP 2 OF REGISTER — create username & password
router.post('/register', async (req, res) => {
  const { username, password, studentId, name } = req.body;

  try {
    const existingUser = await User.findOne({ username: username.trim() });
    if (existingUser) {
      return res.status(400).json({ message: "This username is already taken. Try another." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username.trim(),
      password: hashedPassword,
      role: 'student',
      studentId,
      name
    });
    await newUser.save();

    await PreRegisteredStudent.findOneAndUpdate(
      { studentId },
      { isRegistered: true }
    );

    res.status(201).json({ message: "Account created successfully! You can now login." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      return res.status(400).json({ message: "No account found with this username." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        studentId: user.studentId,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;