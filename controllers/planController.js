// controllers/planController.js
const logWorkout = async (req, res) => {
    try {
      const { date, exercises, duration } = req.body;
  
      console.log("Workout Body:", req.body);
      console.log("User:", req.user);
  
      if (!date || !exercises || !duration) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const workout = {
        user: req.user.id,
        date,
        exercises,
        duration,
      };
  
      // Simulate saving to DB (you'll replace this later with real model)
      console.log("Workout to save:", workout);
  
      res.status(201).json({ message: 'Workout logged successfully', workout });
    } catch (error) {
      console.error('Error logging workout:', error); // THIS will show you the actual cause
      res.status(500).json({ message: 'Failed to log workout.' });
    }
  };
  
  module.exports = { logWorkout };
  