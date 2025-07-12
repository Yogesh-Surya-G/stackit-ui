import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-main">
        <div className="home-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">VLSI</button>
          <button className="filter-btn">Architecture</button>
          <button className="filter-btn">Engineering</button>
        </div>
        <div className="home-content-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="content-card-placeholder"></div>
          ))}
        </div>
      </div>
      <aside className="home-sidebar">
        <div className="stack-info">
          <h2 className="stack-title">STACK NAME(TAG)</h2>
          <p className="stack-related-tags">#relatedothertags</p>
          <ul className="stack-question-list">
            <li>Question 1</li>
            <li>Question 2</li>
            <li>Question 3</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Home;