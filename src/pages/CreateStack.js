import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './CreateStack.css';

const isUUID = (str) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str);

const CreateStack = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(''); // Comma-separated string for simplicity
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Basic validation
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      setLoading(false);
      return;
    }

    // Convert tags to array of trimmed strings and filter for UUIDs
    const tagArray = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => isUUID(tag));

    try {
      if (tagArray.length > 0) {
        await apiService.createQuestion(title, description, tagArray);
      } else {
        await apiService.createQuestion(title, description);
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Failed to create question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-stack-container">
      <h1 className="create-stack-title">Ask a Question</h1>
      <form className="create-stack-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Question posted successfully!</div>}
        <div className="input-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a short, descriptive title"
            required
          />
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your question in detail"
            rows={6}
            required
          />
        </div>
        <div className="input-group">
          <label>Tags (comma separated, UUIDs only for now)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000"
          />
        </div>
        <button type="submit" className="btn btn-submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Question'}
        </button>
      </form>
    </div>
  );
};

export default CreateStack;