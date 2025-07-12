import React, { useState, useEffect } from 'react';
import { FiSearch, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import './Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Fetch unread notification count
  useEffect(() => {
    if (isAuthenticated) {
      const fetchUnreadCount = async () => {
        try {
          const data = await apiService.getUnreadNotificationCount();
          setUnreadCount(data.count);
        } catch (error) {
          console.error('Failed to fetch unread count:', error);
        }
      };

      fetchUnreadCount();
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Fetch notifications when dropdown is opened
  const handleNotificationClick = async () => {
    if (!showNotifications) {
      try {
        const data = await apiService.getNotifications(1, 10, true);
        setNotifications(data.notifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    }
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMarkAllRead = async () => {
    try {
      await apiService.markAllNotificationsAsRead();
      setUnreadCount(0);
      setNotifications([]);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-logo-text">Stackit</div>
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search" />
      </div>
      
      {isAuthenticated ? (
        <div className="header-actions">
          <Link to="/create" className="ask-button">Ask Question</Link>
          
          {/* Notification Bell */}
          <div className="notification-container">
            <button 
              className="notification-bell" 
              onClick={handleNotificationClick}
            >
              <FiBell />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>
            
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={handleMarkAllRead} className="mark-all-read">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="notification-list">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div key={notification.id} className="notification-item">
                        <div className="notification-content">
                          {notification.data?.message || 'New notification'}
                        </div>
                        <div className="notification-time">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-notifications">No new notifications</div>
                  )}
                </div>
                <Link to="/notifications" className="view-all-notifications">
                  View all notifications
                </Link>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="user-menu-container">
            <button className="user-menu-button" onClick={handleUserMenuClick}>
              <FiUser />
              {user?.username}
            </button>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <Link to="/profile" className="dropdown-item">
                  <FiUser /> Profile
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Link to="/login" className="login-button">Login</Link>
      )}
    </header>
  );
};

export default Header;