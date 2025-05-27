// src/pages/UserProgress.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Axios from 'axios';

const UserProgress = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    // Fetch progress data from your backend
    const fetchProgress = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await Axios.get('http://localhost:5000/api/progress', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProgressData(response.data);
      } catch (error) {
        console.error("Error fetching progress data", error);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div>
      <h2>User Progress</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={progressData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="workout" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserProgress;
