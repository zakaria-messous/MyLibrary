import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
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
          <form>
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Username" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm Password" />
            </div>
            <button type="submit" className="register-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
