import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ADD THIS IMPORT

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/signup', { email, password });
            alert('Signup successful! Please log in.');
            window.location.href = '/';
        } catch (error) {
            setErrorMessage('Signup failed. Try another email.');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Signup</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>

            {/* ADD THIS BELOW FORM */}
            <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
    );
};

export default Signup;
