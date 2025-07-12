const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// API service class
class ApiService {
  // Authentication
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  }

  async register(username, email, password, confirmPassword) {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });
    return handleResponse(response);
  }

  // Notifications
  async getNotifications(page = 1, limit = 20, unread = false) {
    const token = getAuthToken();
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(unread && { unread: 'true' }),
    });

    const response = await fetch(`${API_BASE_URL}/api/notifications?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  async markNotificationAsRead(notificationId) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  async markAllNotificationsAsRead() {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/notifications/mark-all-read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  async deleteNotification(notificationId) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  async getUnreadNotificationCount() {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/notifications/unread-count`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  // Questions
  async getQuestions(page = 1, limit = 10, sort = 'newest', tags, search) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort,
      ...(tags && { tags }),
      ...(search && { search }),
    });

    const response = await fetch(`${API_BASE_URL}/api/questions?${params}`);
    return handleResponse(response);
  }

  async getQuestionById(questionId) {
    const response = await fetch(`${API_BASE_URL}/api/questions/${questionId}`);
    return handleResponse(response);
  }

  async createQuestion(title, description, tags) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/questions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, tags }),
    });
    return handleResponse(response);
  }

  // Answers
  async getAnswers(questionId, page = 1, limit = 10, sort = 'newest') {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort,
    });

    const response = await fetch(`${API_BASE_URL}/api/answers/questions/${questionId}/?${params}`);
    return handleResponse(response);
  }

  async createAnswer(questionId, content) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/answers/questions/${questionId}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    return handleResponse(response);
  }

  // Tags
  async getTags(search = '', limit = 50, sort = 'name') {
    const params = new URLSearchParams({
      limit: limit.toString(),
      sort,
      ...(search && { search }),
    });

    const response = await fetch(`${API_BASE_URL}/api/tags?${params}`);
    return handleResponse(response);
  }

  // User Profile
  async getUserProfile() {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  async updateUserProfile(updates) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  }

  async getUserById(userId) {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
    return handleResponse(response);
  }

  // Votes
  async voteOnQuestion(questionId, voteType) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/vote/question/${questionId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ voteType }),
    });
    return handleResponse(response);
  }

  async voteOnAnswer(answerId, voteType) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/vote/answer/${answerId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ voteType }),
    });
    return handleResponse(response);
  }
}

export default new ApiService(); 