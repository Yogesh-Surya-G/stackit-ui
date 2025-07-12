import React, { useState, useEffect } from 'react';
import { FiTrash2, FiCheck, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import './Notifications.css';

const NotificationItem = ({ notification, onMarkRead, onDelete }) => (
  <div className={`notification-item ${!notification.is_read ? 'unread' : ''}`}>
    <div className="notification-content">
      <div className="notification-message">
        {notification.data?.message || 'New notification'}
      </div>
      <div className="notification-meta">
        <span className="notification-time">
          {new Date(notification.created_at).toLocaleDateString()} at{' '}
          {new Date(notification.created_at).toLocaleTimeString()}
        </span>
        <div className="notification-actions">
          {!notification.is_read && (
            <button 
              className="action-button mark-read"
              onClick={() => onMarkRead(notification.id)}
              title="Mark as read"
            >
              <FiCheck />
            </button>
          )}
          <button 
            className="action-button delete"
            onClick={() => onDelete(notification.id)}
            title="Delete notification"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Notifications = () => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false
  });
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async (page = 1) => {
    try {
      setLoading(true);
      const data = await apiService.getNotifications(page, 20);
      setNotifications(data.notifications);
      setPagination(data.pagination);
      setUnreadCount(data.unreadCount);
      setError(null);
    } catch (err) {
      setError('Failed to load notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  const handleMarkRead = async (notificationId) => {
    try {
      await apiService.markNotificationAsRead(notificationId);
      // Update local state
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, is_read: true }
            : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await apiService.deleteNotification(notificationId);
      // Update local state
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      // Update unread count if the deleted notification was unread
      const deletedNotification = notifications.find(n => n.id === notificationId);
      if (deletedNotification && !deletedNotification.is_read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await apiService.markAllNotificationsAsRead();
      setNotifications(prev => prev.map(notif => ({ ...notif, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const handlePageChange = (page) => {
    fetchNotifications(page);
  };

  if (!isAuthenticated) {
    return (
      <div className="notifications-container">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please log in to view your notifications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1 className="notifications-title">Notifications</h1>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllRead} className="mark-all-read-button">
            <FiCheckCircle />
            Mark all as read
          </button>
        )}
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">
          Loading notifications...
        </div>
      ) : (
        <>
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="no-notifications">
                <FiCheckCircle />
                <p>No notifications to display</p>
                <span>You're all caught up!</span>
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
                className="pagination-button"
              >
                Previous
              </button>
              
              <span className="pagination-info">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Notifications;