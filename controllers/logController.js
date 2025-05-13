const WorkoutLog = require('../models/WorkoutLog.model');

// Log a workout log entry
exports.logWorkout = async (req, res) => {
  try {
    const { exercises, date } = req.body;
    const userId = req.user._id; // Assuming you are storing the user in the request body (via authMiddleware)

    // Validate required fields
    if (!exercises || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate exercises structure
    exercises.forEach((exercise) => {
      if (!exercise.name || !exercise.sets || !exercise.reps) {
        return res.status(400).json({ message: 'Exercise name, sets, and reps are required' });
      }
    });

    // Create a new workout log entry
    const newWorkoutLog = new WorkoutLog({
      userId: userId, // Storing the userId that is logged in
      date: date, // The date of the workout
      exercises: exercises // Exercises array
    });

    // Save the workout log to the database
    const savedWorkoutLog = await newWorkoutLog.save();
  // Return the saved workout log as a response
    res.status(200).json({ message: 'Workout logged successfully', workout: savedWorkoutLog });
  } catch (error) {
    console.error('Error logging workout:', error);
    res.status(500).json({ message: 'Failed to log workout', error: error.message });
  }
};
