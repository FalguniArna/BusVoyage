const express = require('express');
const router = express.Router();
const LostFound = require('../models/LostFound');

router.get('/', async (req, res) => {
  try {
    const items = await LostFound.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error("FULL BACKEND ERROR:", err); 
    res.status(500).json({ message: "Server error", detail: err.message }); 
}
});

router.post('/', async (req, res) => {
  try {
    const item = new LostFound(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error("FULL BACKEND ERROR:", err);
    res.status(500).json({ message: "Server error", detail: err.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const item = await LostFound.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    console.error("FULL BACKEND ERROR:", err);
    res.status(500).json({ message: "Server error", detail: err.message });
  }
});

module.exports = router;