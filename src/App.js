import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import WorkoutPlans from './pages/WorkoutPlans';
import PersonalizedPlans from './pages/PersonalizedPlans';
import WorkoutLogForm from './pages/WorkoutLogForm';
import FitnessGoals from './pages/FitnessGoals';
import Progress from './pages/Progress';

import PrivateRoute from './PrivateRoute'; // Authentication wrapper

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/edit-profile" element={<PrivateRoute element={EditProfile} />} />
        <Route path="/plans" element={<PrivateRoute element={WorkoutPlans} />} />
        <Route path="/personalized-plans" element={<PrivateRoute element={PersonalizedPlans} />} />
        <Route path="/workout-log" element={<PrivateRoute element={WorkoutLogForm} />} />
        <Route path="/fitness-goals" element={<PrivateRoute element={FitnessGoals} />} />
        <Route path="/progress" element={<PrivateRoute element={Progress} />} />
      </Routes>
    </Router>
  );
};

export default App;
