const express = require('express');
const router = express.Router();
const FitnessGoal = require('../models/FitnessGoal.model');
const protect = require('../middleware/authMiddleware');

// @desc    Set a new fitness goal
// @route   POST /api/goals
// @access  Private
router.post('/', protect, async (req, res) => {
  const { goal, targetDate } = req.body;

  try {
    const newGoal = await FitnessGoal.create({
      user: req.user._id,
      goal,
      targetDate,
    });

    res.status(201).json(newGoal);
  } catch (err) {
    console.error('Error creating goal:', err);
    res.status(500).json({ error: 'Failed to set goal' });
  }
});

// @desc    Get latest fitness goal
// @route   GET /api/goals
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const goal = await FitnessGoal.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(goal);
  } catch (err) {
    console.error('Error fetching goal:', err);
    res.status(500).json({ error: 'Failed to fetch goal' });
  }
});

module.exports = router;
