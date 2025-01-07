import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './navigation.css';
import profileImage from '../../assets/profile.jpg';

const Navigation = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);  // State for storing user data
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);  // Set user data if available
    }
  }, []);

  const toggleDropdown = () => {
    console.log("Toggling dropdown", !isDropdownOpen); // Debugging the toggle
    setDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (route) => {
    navigate(route);
    setDropdownOpen(false); // Close dropdown after navigation
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav id="menu" className={`navbar navbar-default navbar-fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand page-scroll" onClick={() => handleNavigation('/')}>
            MyLibrary
          </a>
        </div>

        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            {isHomePage ? (
              <>
                <li><a href="#features" onClick={() => handleNavigation('#features')}>Features</a></li>
                <li><a href="#team" onClick={() => handleNavigation('#team')}>Team</a></li>
                <li><a href="#contact" onClick={() => handleNavigation('#contact')}>Contact</a></li>
                <li><button onClick={() => handleNavigation('/login')} className="login-button" id='login-button'>Login</button></li>
              </>
            ) : (
              <>
                <li>
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search for books..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="search-input"
                    />
                  </div>
                </li>
                {user && (
                  <li className="user-fullname">
                    <span>{user.fullname}</span>
                  </li>
                )}
                <li className={`profile-dropdown ${isDropdownOpen ? 'open' : ''}`}>
                  <button
                    className="profile-btn"
                    onClick={toggleDropdown}
                    style={{ backgroundImage: `url(${profileImage})` }}
                  ></button>

                  {user && isDropdownOpen && (  // Display dropdown only if user is logged in
                    <ul className="dropdown-menu">
                      <li onClick={() => handleNavigation('/profile')}>Profile</li>
                      <li onClick={() => handleNavigation('/reservations')}>Reservations</li>
                      <li onClick={() => handleNavigation('/logout')}>Logout</li>
                    </ul>
                  )}
                </li>
               
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
