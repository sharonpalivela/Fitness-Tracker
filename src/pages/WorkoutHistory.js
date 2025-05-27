import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkoutHistory = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/logs/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLogs(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch workout history.');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Your Workout History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : logs.length === 0 ? (
        <p>No workout logs found.</p>
      ) : (
        logs.map((log, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
            <h4>Date: {new Date(log.date).toLocaleDateString()}</h4>
            <ul>
              {log.exercises.map((ex, i) => (
                <li key={i}>
                  <strong>{ex.name}</strong> - {ex.sets} sets × {ex.reps} reps 
                  {ex.weight && ` @ ${ex.weight}kg`} 
                  {ex.duration && `, Duration: ${ex.duration} mins`}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkoutHistory;
