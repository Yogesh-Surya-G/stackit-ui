import React, { useState } from 'react';
import './Profile.css';
import userAvatar from '../assets/user-avatar.png'; // Make sure to have this image
import { FiEdit2 } from 'react-icons/fi';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('asked');

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-header">
        <img src={userAvatar} alt="Username" className="profile-avatar" />
        <div className="profile-info">
          <span className="profile-username">username</span>
          <span className="profile-email">email id <FiEdit2 size={14} /></span>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === 'asked' ? 'active' : ''}`}
          onClick={() => setActiveTab('asked')}
        >
          QUESTIONS ASKED
        </button>
        <button
          className={`tab-btn ${activeTab === 'answered' ? 'active' : ''}`}
          onClick={() => setActiveTab('answered')}
        >
          QUESTIONS ANSWERED
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'asked' && (
          <div className="profile-question-card">
            <h3 className="profile-q-title">Question</h3>
            <p className="profile-q-desc">Description</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;