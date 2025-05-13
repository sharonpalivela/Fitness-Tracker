const User = require('../models/userModel');

// @desc    Set fitness goals for a user
// @route   POST /api/goals/set
// @access  Private
const setGoal = async (req, res) => {
  const { weightGoal, muscleMassGoal } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.goals = {
      weightGoal,
      muscleMassGoal,
    };

    await user.save();

    res.status(200).json({ message: 'Goals saved successfully', goals: user.goals });
  } catch (error) {
    console.error('Error saving goals:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { setGoal };
