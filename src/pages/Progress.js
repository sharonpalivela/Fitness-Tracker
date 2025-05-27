import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Progress = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgressData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if no token
        window.location.href = '/';
      }

      try {
        // Replace with your API endpoint for user progress
        const response = await axios.get('http://localhost:5000/api/users/progress', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProgressData(response.data); // Set the progress data
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div className="progress-container">
      <h2>Your Fitness Progress</h2>
      {progressData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            <Line type="monotone" dataKey="muscleMass" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading progress...</p>
      )}
    </div>
  );
};

export default Progress;
