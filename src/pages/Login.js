import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // Added loading state
    const navigate = useNavigate(); // useNavigate hook

    const handleLogin = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);  // Set loading to true while making request
        
        try {
            // Send login credentials to the backend
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
   
            // Check if we got a token
            if (response.data.token) {
                // Store the JWT token in localStorage
                localStorage.setItem('token', response.data.token);
   
                // Redirect to Dashboard using React Router
                navigate('/dashboard');
            } else {
                // Handle failed login
                setErrorMessage('Login failed. Please try again.');
            }
        } catch (error) {
            // Handle error (e.g., invalid email/password)
            setErrorMessage('Invalid email or password');
        } finally {
            setIsLoading(false);  // Set loading to false after request completes
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
            
            <p>
                Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
        </div>
    );
};

export default Login;
