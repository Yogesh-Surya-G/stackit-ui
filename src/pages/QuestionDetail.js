import React from 'react';
import { FiArrowUp, FiArrowDown, FiMessageSquare } from 'react-icons/fi';
import './QuestionDetail.css';

const QuestionDetail = () => {
  return (
    <div className="question-detail-container">
      <h1 className="q-detail-stack-name">Stack Name</h1>
      
      <div className="q-card">
        <h2 className="q-card-title">Question</h2>
        <p className="q-card-description">Description</p>
        <div className="q-card-actions">
          <FiArrowUp />
          <FiArrowDown />
          <FiMessageSquare />
        </div>
      </div>

      <div className="q-card answer-card">
        <h2 className="q-card-title">Answer 1</h2>
        <p className="q-card-description">Description</p>
        <div className="q-card-actions">
          <FiArrowUp />
          <FiArrowDown />
        </div>
      </div>

      <div className="answer-input-box">
        <textarea placeholder="your answer here..."></textarea>
        <button className="post-btn">Post</button>
      </div>
    </div>
  );
};

export default QuestionDetail;