import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import QuestionDetail from './pages/QuestionDetail';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import CreateStack from './pages/CreateStack';
import './App.css';

// Layout component to wrap pages with Header and Sidebar
const MainLayout = ({ children }) => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '80px' }}>
      <Header />
      <main style={{ padding: '20px 40px' }}>{children}</main>
    </div>
  </div>
);


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Separate component to use useLocation hook
function AppContent() {
    const location = useLocation();
    const showLayout = location.pathname !== '/login';

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
                showLayout ? (
                    <MainLayout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/notifications" element={<Notifications />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/question" element={<QuestionDetail />} />
                            <Route path="/create" element={<CreateStack />} />
                        </Routes>
                    </MainLayout>
                ) : null
            } />
        </Routes>
    );
}

export default App;