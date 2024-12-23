import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        {/* Section gauche */}
        <div className="login-left">
          <h2>Sign In</h2>
          
          <form>
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Username" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Password" />
            </div>
            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <a href="#">Forgot Password</a>
            </div>
            <Link to="/library" className="login-button">
            Sign In
          </Link>
          </form>
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
    </div>
  );
}

export default Login;
