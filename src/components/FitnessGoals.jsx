import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FitnessGoals = () => {
  const [goal, setGoal] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [currentGoal, setCurrentGoal] = useState(null);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  // 🔄 Fetch current goal
  const fetchGoal = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/goals', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentGoal(res.data);
    } catch (err) {
      setCurrentGoal(null);
    }
  };

  useEffect(() => {
    fetchGoal();
  }, []);

  // ✅ Submit goal
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/goals/set',
        { goal, targetDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Goal set successfully!');
      setGoal('');
      setTargetDate('');
      fetchGoal();
    } catch (err) {
      setMessage('Failed to set goal.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">🏆 Set Your Fitness Goal</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Enter your fitness goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Set Goal
        </button>
      </form>

      {message && <p className="mt-2 text-green-600">{message}</p>}

      {currentGoal ? (
        <div className="mt-4">
          <h3 className="font-semibold">🎯 Current Goal:</h3>
          <p>{currentGoal.goal}</p>
          {currentGoal.targetDate && (
            <p className="text-gray-500">
              Target Date: {new Date(currentGoal.targetDate).toLocaleDateString()}
            </p>
          )}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No goal set yet.</p>
      )}
    </div>
  );
};

export default FitnessGoals;
