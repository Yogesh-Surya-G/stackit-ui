import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Add login logic here
        navigate('/'); // Navigate to home on login
    };


  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-logo">Stackit</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" required />
          </div>
          <a href="#" className="forgot-password">Forgot password?</a>
          <div className="button-group">
            <button type="submit" className="btn btn-login">Log in</button>
            <button type="button" className="btn btn-signup">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;