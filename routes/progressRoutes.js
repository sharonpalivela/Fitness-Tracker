const express = require('express');
const router = express.Router();


const protect = require('../middleware/authMiddleware');
const WorkoutLog = require('../models/WorkoutLog.model');   


router.get('/progress', protect, async (req, res) => {
  try {
    const logs = await WorkoutLog.find({ user: req.user._id }).sort({ date: 1 });

    const progressData = logs.map(log => ({
      date: log.date.toISOString().split('T')[0],
      weight: log.weight,
      muscleMass: log.muscleMass
    }));

    res.json(progressData);
  } catch (err) {
    console.error('Failed to fetch progress:', err);
    res.status(500).json({ message: 'Failed to fetch progress' });
  }
});

module.exports = router;
