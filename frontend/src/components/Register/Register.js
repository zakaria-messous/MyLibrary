import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import axiosInstance from '../../axios'; // Import the custom axios instance

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setToastMessage('');
    setShowToast(false);

    if (!fullName || !email || !password || !confirmPassword) {
      setToastMessage('All fields are required.');
      setShowToast(true);
      return;
    }

    if (!validateEmail(email)) {
      setToastMessage('Invalid email format.');
      setShowToast(true);
      return;
    }

    if (password.length < 6) {
      setToastMessage('Password must be at least 6 characters.');
      setShowToast(true);
      return;
    }

    if (password !== confirmPassword) {
      setToastMessage('Passwords do not match.');
      setShowToast(true);
      return;
    }

    const registerData = { fullName, email, password };

    try {
      const response = await axiosInstance.post('/auth/signup', registerData);
      setToastMessage('Registration successful! Redirecting to login...');
      setShowToast(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      if (error.response) {
        // Show backend error
        setToastMessage(error.response.data.message || 'An error occurred during registration.');
      } else {
        setToastMessage('An error occurred during registration.');
      }
      setShowToast(true);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-right">
          <h2>Already Registered?</h2>
          <Link to="/login" className="signin-button">Sign In</Link>
        </div>

        <div className="register-left">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            {/* Input Fields */}
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      
      {showToast && <div className="toast">{toastMessage}</div>}
    </div>
  );
}

export default Register;