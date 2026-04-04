const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find().sort({ isActive: -1, departureTime: 1 });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { isActive, currentLocation, crowdStatus, comment } = req.body;
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { isActive, currentLocation, crowdStatus, comment },
      { new: true }
    );
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;