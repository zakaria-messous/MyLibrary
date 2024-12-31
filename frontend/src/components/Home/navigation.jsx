import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = (props) => {
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
    <nav id="menu" className={`navbar navbar-default navbar-fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand page-scroll" href="#page-top" onClick={() => handleNavigation('/')}>
            MyLibrary
          </a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a
                href="#features"
                className={location.hash === '#features' ? 'active' : ''}
                onClick={() => handleNavigation('#features')}
              >
                Features
              </a>
            </li>
           
            
           
            <li>
              <a
                href="#team"
                className={location.hash === '#team' ? 'active' : ''}
                onClick={() => handleNavigation('#team')}
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={location.hash === '#contact' ? 'active' : ''}
                onClick={() => handleNavigation('#contact')}
              >
                Contact
              </a>
            </li>
            <li>
              <button onClick={() => handleNavigation('/login')} className="login-button" id="login-button">
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>

    

     
    </nav>
  );
};

export default Navigation;  // Exportation par défaut
