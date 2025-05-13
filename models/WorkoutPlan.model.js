const mongoose = require('mongoose');

// Define the workout plan schema
const workoutPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goalType: { 
    type: String, 
    enum: ['Weight Loss', 'Muscle Gain', 'Endurance'], 
    required: true 
  },
  duration: { type: String },
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: { type: Number, required: false },
    duration: { type: Number, required: false }  // Optional for cardio exercises
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
