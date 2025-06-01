const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const User = require("../models/userModel");
const WorkoutLog = require("../models/WorkoutLog.model");
const bcrypt = require("bcryptjs");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post("/register", registerUser);

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
router.post('/login', loginUser);


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ NEW: Get user fitness progress data
// @route   GET /api/users/progress
// @access  Private
router.get('/progress', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const logs = await WorkoutLog.find({ user: userId }).sort({ date: 1 });

    const chartData = logs.map(log => ({
      date: log.date.toISOString().split('T')[0],
      weight: log.weight,
      muscleMass: log.muscleMass || null,
    }));

    res.json(chartData);
  } catch (error) {
    console.error("Error fetching progress data:", error);
    res.status(500).json({ message: "Failed to fetch progress data" });
  }
});

module.exports = router;
