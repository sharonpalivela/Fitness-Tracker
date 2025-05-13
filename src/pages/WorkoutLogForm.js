import React, { useState } from 'react';
import Axios from 'axios';

const WorkoutLogForm = () => {
  const [date, setDate] = useState('');
  const [exercises, setExercises] = useState([
    { name: '', sets: '', reps: '', weight: '', duration: '' }
  ]);
  const [message, setMessage] = useState('');

  const handleChange = (index, event) => {
    const values = [...exercises];
    values[index][event.target.name] = event.target.value;
    setExercises(values);
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', weight: '', duration: '' }]);
  };

  const handleRemoveExercise = (index) => {
    const values = [...exercises];
    values.splice(index, 1);
    setExercises(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await Axios.post('/api/logs/log', { exercises, date }, config);

      setMessage('Workout logged successfully!');
      setDate('');
      setExercises([{ name: '', sets: '', reps: '', weight: '', duration: '' }]);
     } catch (error) {
  console.error("Logging workout failed:", error.response?.data || error.message);
  setMessage('Error logging workout.');
}
  };

  return (
    <div>
      <h2>Log Your Workout</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {exercises.map((exercise, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              name="name"
              value={exercise.name}
              placeholder="Exercise Name"
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="number"
              name="sets"
              value={exercise.sets}
              placeholder="Sets"
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="number"
              name="reps"
              value={exercise.reps}
              placeholder="Reps"
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="number"
              name="weight"
              value={exercise.weight}
              placeholder="Weight (kg)"
              onChange={(e) => handleChange(index, e)}
            />
            <input
              type="number"
              name="duration"
              value={exercise.duration}
              placeholder="Duration (min)"
              onChange={(e) => handleChange(index, e)}
            />
            <button type="button" onClick={() => handleRemoveExercise(index)}>Remove</button>
          </div>
        ))}

        <button type="button" onClick={handleAddExercise}>Add Exercise</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WorkoutLogForm;
