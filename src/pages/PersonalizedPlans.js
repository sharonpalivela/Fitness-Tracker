import React, { useState } from 'react';
import axios from 'axios';

const PersonalizedPlans = () => {
  const [goal, setGoal] = useState('');
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  const fetchPlan = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/workouts/personalized-plans?goal=${goal}`);
      setPlan(res.data);
      setError('');
    } catch (err) {
      setPlan(null);
      setError('No plan found for this goal');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Get Your Personalized Workout Plan</h2>
      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        <option value="">-- Select Goal --</option>
        <option value="weightLoss">Weight Loss</option>
        <option value="muscleBuilding">Muscle Building</option>
        <option value="generalFitness">General Fitness</option>
      </select>
      <button onClick={fetchPlan} disabled={!goal} style={{ marginLeft: '10px' }}>
        Get Plan
      </button>

      {plan && (
        <div style={{ marginTop: '20px' }}>
          <h3>Plan: {plan.plan}</h3>
          <p>{plan.description}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PersonalizedPlans;
