import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const ProgressChart = ({ token }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWorkoutLogs = async () => {
      try {
        const res = await axios.get('/api/logs', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Group logs by date
        const logsByDate = {};
        res.data.forEach(log => {
          const date = new Date(log.date).toLocaleDateString();
          if (!logsByDate[date]) logsByDate[date] = 0;
          logsByDate[date]++;
        });

        // Convert to array for Recharts
        const formattedData = Object.keys(logsByDate).map(date => ({
          date,
          workouts: logsByDate[date],
        }));

        setData(formattedData);
      } catch (err) {
        console.error('Error fetching logs:', err);
      }
    };

    fetchWorkoutLogs();
  }, [token]);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h2 className="text-xl font-semibold mb-4">Workout Frequency</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="workouts" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
