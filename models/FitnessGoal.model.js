const mongoose = require('mongoose');

const fitnessGoalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    goal: {
      type: String,
      required: true,
      trim: true,
    },
    targetDate: {
      type: Date,
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const FitnessGoal = mongoose.model('FitnessGoal', fitnessGoalSchema);

module.exports = FitnessGoal;
