const express = require('express');
const router = express.Router();
const WorkoutLog = require('../models/WorkoutLog.model'); // Make sure model path is correct
const authenticate = require('../middleware/authMiddleware');

// POST /api/logs/log - Log a new workout
router.post('/log', authenticate, async (req, res) => {
  const { exercises, date } = req.body;

  if (!exercises || exercises.length === 0) {
    return res.status(400).json({ message: 'Workout must include at least one exercise.' });
  }

  try {
    const workout = new WorkoutLog({
      user: req.user.id,
      exercises,
      date: date || new Date(),
    });

    await workout.save();
    res.status(201).json({ message: 'Workout logged successfully', workout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while logging workout.' });
  }
});

// GET /api/logs/history - Get workout history for the logged-in user
router.get('/history', authenticate, async (req, res) => {
  try {
    const logs = await WorkoutLog.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching workout history.' });
  }
});

module.exports = router;
