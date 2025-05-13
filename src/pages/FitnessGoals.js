import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FitnessGoals = () => {
  const [goals, setGoals] = useState({
    weightGoal: '',
    muscleMassGoal: '',
  });

  const navigate = useNavigate();

  // Fetch current fitness goals from backend on component load
  useEffect(() => {
    const fetchGoals = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if no token
        navigate('/');
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users/goals', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGoals({
          weightGoal: response.data.weightGoal || '',
          muscleMassGoal: response.data.muscleMassGoal || '',
        });
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, [navigate]);

  // Handle form submission to update fitness goals
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      return navigate('/');
    }

    try {
      // Send updated goals to backend
      await axios.put(
        'http://localhost:5000/api/users/goals',
        { weightGoal: goals.weightGoal, muscleMassGoal: goals.muscleMassGoal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Fitness goals updated successfully!');
    } catch (error) {
      console.error('Error updating goals:', error);
    }
  };

  const handleChange = (e) => {
    setGoals({
      ...goals,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fitness-goals-container">
      <h2>Set Your Fitness Goals</h2>
      <form onSubmit={handleSubmit}>
        <div className="goal-input">
          <label htmlFor="weightGoal">Weight Goal (kg):</label>
          <input
            type="number"
            id="weightGoal"
            name="weightGoal"
            value={goals.weightGoal}
            onChange={handleChange}
            required
          />
        </div>

        <div className="goal-input">
          <label htmlFor="muscleMassGoal">Muscle Mass Goal (kg):</label>
          <input
            type="number"
            id="muscleMassGoal"
            name="muscleMassGoal"
            value={goals.muscleMassGoal}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Save Goals</button>
      </form>
    </div>
  );
};

export default FitnessGoals;
