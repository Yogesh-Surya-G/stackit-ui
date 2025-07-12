import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo-text">Stackit</div>
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search" />
      </div>
      <Link to="/create" className="ask-button">Ask Question</Link>
    </header>
  );
};

export default Header;