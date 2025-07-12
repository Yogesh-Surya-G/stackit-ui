import React from 'react';
import './Notifications.css';

const NotificationItem = ({ content }) => (
    <div className="notification-item">
        {content}
    </div>
);


const Notifications = () => {
  return (
    <div className="notifications-container">
      <h1 className="notifications-title">Notifications</h1>
      <div className="notifications-list">
        <NotificationItem content="Notification Content" />
        <NotificationItem content="Notification Content" />
        <NotificationItem content="Notification Content" />
        <NotificationItem content="Notification Content" />
        <NotificationItem content="Notification Content" />
      </div>
    </div>
  );
};

export default Notifications;