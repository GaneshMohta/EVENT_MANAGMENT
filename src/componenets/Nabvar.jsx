import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
      const [names] = email.split('@');
      setUsername(names);
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      setUserEmail(null);
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="navbar">
      <h1 className="logo text-green-300 text-pretty">UTSAAV</h1>

      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? 'bar1' : ''}`}>.</div>
        <div className={`bar ${menuOpen ? 'bar2' : ''}`}>.</div>
        <div className={`bar ${menuOpen ? 'bar3' : ''}`}>.</div>
      </div>

      <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><a href="#aboutus">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
          {userEmail ? (
            <li className="user-email" onClick={handleLogout}>
              {username}
            </li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}
