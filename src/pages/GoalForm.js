import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoalForm = () => {
  const [goalType, setGoalType] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [userGoal, setUserGoal] = useState(null);

  // Fetch current goal
  useEffect(() => {
    axios
      .get('/api/plans/get-goal', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((response) => setUserGoal(response.data))
      .catch((error) => console.error('Error fetching goal:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set or update goal
    axios
      .post(
        '/api/plans/set-goal',
        { goalType, targetDate },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      .then((response) => {
        alert('Goal set/updated successfully!');
        setUserGoal(response.data.goal); // Update the state with the new goal
      })
      .catch((error) => console.error('Error setting goal:', error));
  };

  return (
    <div>
      <h2>Set Your Fitness Goal</h2>

      {userGoal ? (
        <div>
          <h3>Your Current Goal</h3>
          <p>Goal Type: {userGoal.goalType}</p>
          <p>Target Date: {new Date(userGoal.targetDate).toLocaleDateString()}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Goal Type</label>
            <select onChange={(e) => setGoalType(e.target.value)} value={goalType}>
              <option value="weightLoss">Weight Loss</option>
              <option value="muscleBuilding">Muscle Building</option>
              <option value="generalFitness">General Fitness</option>
            </select>
          </div>

          <div>
            <label>Target Date</label>
            <input type="date" onChange={(e) => setTargetDate(e.target.value)} value={targetDate} />
          </div>

          <button type="submit">Set Goal</button>
        </form>
      )}
    </div>
  );
};

export default GoalForm;
