const mongoose = require('mongoose');

// Define the workout log schema
const workoutLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model, assuming a User model exists
    required: true 
  }, 
  date: { 
    type: Date, 
    default: Date.now 
  },
  exercises: [{
    name: { 
      type: String, 
      required: true 
    },
    sets: { 
      type: Number, 
      required: true 
    },
    reps: { 
      type: Number, 
      required: true 
    },
    weight: { 
      type: Number, 
      required: false 
    }, // Optional for strength exercises
    duration: { 
      type: Number, 
      required: false 
    } // Optional for cardio exercises
  }]
});

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);
