import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axiosInstance from '../../axios'; // Import the custom axios instance

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error messages
    setErrorMessage('');
    setToastMessage('');
    setShowToast(false);

    // Validation of inputs
    if (!email || !password) {
      setToastMessage('Please fill in both email and password');
      setShowToast(true);
      return;
    }

    const loginData = { email : email, password };  // Send login data

    try {
      // Make API call to the login endpoint
      const response = await axiosInstance.post('/auth/login', loginData);

      // Store the received token and expiration time in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiresIn', response.data.expiresIn);

      setToastMessage('Login successful! Redirecting...');
      setShowToast(true);

      // Redirect to a protected page (e.g., /library)
      setTimeout(() => {
        navigate('/library'); // Redirect to the library page (or any other protected route)
      }, 1500); // Wait 1.5 seconds before redirecting

    } catch (error) {
      setToastMessage('Invalid email or password');
      setShowToast(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h2>Sign In</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <div className="login-right">
          <h2>Welcome Back</h2>
          <p>Don't have an account?</p>
          <Link to="/register" className="signup-button">
            Sign Up
          </Link>
        </div>
      </div>

      {showToast && (
        <div className={`toast ${toastMessage.includes('successful') ? 'success-toast' : 'error-toast'}`}>
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
