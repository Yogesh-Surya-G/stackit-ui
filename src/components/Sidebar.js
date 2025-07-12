import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-link" title="Home">
          <FiHome size={24} />
        </NavLink>
        <NavLink to="/notifications" className="sidebar-link" title="Notifications">
          <FiBell size={24} />
        </NavLink>
        <NavLink to="/profile" className="sidebar-link" title="Profile">
          <FiUser size={24} />
        </NavLink>
      </nav>
      <div className="sidebar-logout">
        <NavLink to="/login" className="sidebar-link" title="Logout">
          <FiLogOut size={24} />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;