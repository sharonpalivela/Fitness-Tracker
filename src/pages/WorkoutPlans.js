import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkoutPlans = () => {
  const [goal, setGoal] = useState('weightLoss'); // default goal
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/plans/personalized-plans?goal=${goal}`);
        setPlan(res.data);
      } catch (err) {
        console.error('Error fetching plan:', err);
        setPlan(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [goal]);

  return (
    <div className="workout-container">
      <h2>Select Your Fitness Goal</h2>
      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        <option value="weightLoss">Weight Loss</option>
        <option value="muscleBuilding">Muscle Building</option>
        <option value="generalFitness">General Fitness</option>
      </select>

      {loading ? (
        <p>Loading workout plan...</p>
      ) : plan ? (
        <div className="plan-details">
          <h3>Plan: {plan.plan}</h3>
          <p>Description: {plan.description}</p>
        </div>
      ) : (
        <p>No plan found for this goal.</p>
      )}
    </div>
  );
};

export default WorkoutPlans;
