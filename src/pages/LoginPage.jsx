import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginPage = ({ onLogin }) => {
    const BASE_URL=process.env.REACT_APP_BACKEND_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/admin/login`, {
            // const response = await axios.post('http://localhost:5000/api/admin/login', {
                username,
                password,
            });
            if (response.status === 200) {
                toast.success("Login successful!");
                onLogin();
              }
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Admin Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{color:"red"}}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;

