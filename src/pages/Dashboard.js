import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {user ? (
        <div className="dashboard-content">
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>

          <nav className="dashboard-nav">
            <ul>
              <li><Link to="/edit-profile">Edit Profile</Link></li>
              <li><Link to="/plans">Workout Plans</Link></li>
              <li><Link to="/personalized-plans">Personalized Plans</Link></li>
              <li><Link to="/workout-log">Workout Log</Link></li>
              <li><Link to="/fitness-goals">Fitness Goals</Link></li>
              <li><Link to="/progress">Track Progress</Link></li>
            </ul>
          </nav>

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;

