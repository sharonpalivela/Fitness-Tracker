const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  goalType: { type: String, enum: ['weightLoss', 'muscleBuilding', 'generalFitness'], required: true },
  targetDate: { type: Date, required: true },
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
