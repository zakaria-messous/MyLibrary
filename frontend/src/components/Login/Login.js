import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();  // useNavigate hook for redirect

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'meriame@gmail.com' && password === 'meriame1234') {
      // Success: Display toast and redirect
      setToastMessage('Login successful! Redirecting to Library...');
      setShowToast(true);
      setTimeout(() => {
        navigate('/library'); // Redirect to Library page
      }, 1500); // Delay before redirecting
    } else {
      // Error: Display toast with incorrect credentials
      setToastMessage('Incorrect credentials. Please try again!');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000); // Hide toast after 3 seconds
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Section gauche */}
        <div className="login-left">
          <h2>Sign In</h2>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <a href="#">Forgot Password</a>
            </div>
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>

          {/* Error message */}
          {errorMessage && (
            <p className={`message ${errorMessage === 'Login successful!' ? 'success' : 'error'}`}>
              {errorMessage}
            </p>
          )}
        </div>

        {/* Section droite */}
        <div className="login-right">
          <h2>Welcome to login</h2>
          <p>Don't have an account?</p>
          <Link to="/Register" className="signup-button">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className={`toast ${toastMessage.includes('successful') ? 'success-toast' : 'error-toast'}`}>
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
