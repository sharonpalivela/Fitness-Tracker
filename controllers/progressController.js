// controllers/progressController.js
const WorkoutLog = require("../models/WorkoutLog.model");

const getProgress = async (req, res) => {
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
};

module.exports = { getProgress };
