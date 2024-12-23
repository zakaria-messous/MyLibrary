import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Pour détecter l'URL actuelle

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (route) => {
    navigate(route);
    setDropdownOpen(false);
  };

  // Vérifie si l'utilisateur est sur la page "Home"
  const isHomePage = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>MyLibrary</h1>
      </div>

      {/* Afficher uniquement le bouton "Login" sur la page d'accueil */}
      {isHomePage ? (
        <button onClick={() => handleNavigation('/login')} className="login-button">
          Login
        </button>
      ) : (
        <>
          <div className="navbar-links">
            <button onClick={() => handleNavigation('/library')}>Home</button>
            <button onClick={() => handleNavigation('/about')}>About</button>
            <button onClick={() => handleNavigation('/contact')}>Contact</button>
          </div>
          <div className="navbar-search">
            <input type="text" placeholder="Search..." />
            <button>🔍</button>
          </div>
          <div className="navbar-profile">
            <button className="profile-button" onClick={toggleDropdown}>
              <img
                src="https://via.placeholder.com/30"
                alt="Profile"
                className="profile-icon"
              />
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleNavigation('/profile')}>Profile</button>
                <button onClick={() => handleNavigation('/reservations')}>Reservations</button>
                <button onClick={() => handleNavigation('/logout')}>Logout</button>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
