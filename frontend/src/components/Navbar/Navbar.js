import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // State to track scroll position
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (route) => {
    navigate(route);
    setDropdownOpen(false);
  };

  const isHomePage = location.pathname === '/';

  // Scroll event listener to detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Add the condition to detect when to change background color
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup the event listener
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <h1 onClick={() => handleNavigation('/')}>MyLibrary</h1>
      </div>

      {isHomePage ? (
        <div className="navbar-links-home">
          <button
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => handleNavigation('/')}
          >
            Home
          </button>
          <button
            className={location.pathname === '#about' ? 'active' : ''}
            onClick={() => handleNavigation('#about')}
          >
            About
          </button>
          <button
            className={location.pathname === '/contact' ? 'active' : ''}
            onClick={() => handleNavigation('/contact')}
          >
            Contact
          </button>
          <button onClick={() => handleNavigation('/login')} className="login-button">
            Login
          </button>
        </div>
      ) : (
        <>
          <div className="navbar-links">
            <button
              className={location.pathname === '/library' ? 'active' : ''}
              onClick={() => handleNavigation('/library')}
            >
              Home
            </button>
            <button
              className={location.pathname === '#about' ? 'active' : ''}
              onClick={() => handleNavigation('#about')}
            >
              About
            </button>
            <button
              className={location.pathname === '/contact' ? 'active' : ''}
              onClick={() => handleNavigation('/contact')}
            >
              Contact
            </button>
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
