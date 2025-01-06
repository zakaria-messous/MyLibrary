import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import './Register.css';
// Import the data.json file
import userData from '../../data/data.json';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [existingUsers, setExistingUsers] = useState([]);
  const navigate = useNavigate();

  // Use the imported data directly
  useEffect(() => {
    setExistingUsers(userData.users); // Assuming 'users' is an array in your data.json
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Reset error messages
    setErrorMessage('');
    setToastMessage('');
    setShowToast(false);

    // Validation des champs
    if (!username || !email || !password || !confirmPassword) {
      setToastMessage('All fields are required.');
      setShowToast(true);
      return;
    }

    if (!validateEmail(email)) {
      setToastMessage('Invalid email format.');
      setShowToast(true);
      return;
    }

    // Check if email or username already exists
    const emailExists = existingUsers.some(user => user.email === email);
    const usernameExists = existingUsers.some(user => user.username === username);

    if (emailExists) {
      setToastMessage('This email is already registered.');
      setShowToast(true);
      return;
    }

    if (usernameExists) {
      setToastMessage('This username is already taken.');
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

    // If everything is valid
    setToastMessage('Registration successful! Redirecting to login...');
    setShowToast(true);

    // Redirect to login page after a small delay
    setTimeout(() => {
      navigate('/login');
    }, 1500); // Wait 1.5 seconds before redirecting
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Section droite */}
        <div className="register-right">
          <h2>Welcome Back</h2>
          <p>Already have an account?</p>
          <Link to="/login" className="signin-button">
            Sign In
          </Link>
        </div>

        {/* Section gauche */}
        <div className="register-left">
          <h2>Sign Up</h2>
          <form onSubmit={handleRegister}>
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
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="register-button">
              Sign Up
            </button>
          </form>

          {/* Displaying the error message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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

export default Register;
