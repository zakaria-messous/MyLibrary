import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import data from '../../data/data.json';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = data.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Save the user data to localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      setIsSuccess(true);
      setToastMessage(`Welcome ${user.fullname}! Redirecting to Library...`);
      setShowToast(true);
      setTimeout(() => {
        navigate('/library');
      }, 1500);
    } else {
      setIsSuccess(false);
      setToastMessage('Incorrect email or password. Please try again!');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
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
        </div>

        {/* Right section */}
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
        <div className={`toast ${isSuccess ? 'success-toast' : 'error-toast'}`}>
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
