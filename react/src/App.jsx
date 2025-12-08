import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

function AuthNav() {
  const location = useLocation();
  
  return (
    <div className="nav-links">
      {location.pathname === '/login' ? (
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      ) : (
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      )}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const handleSignup = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          <>
            <Routes>
              <Route 
                path="/login" 
                element={<Login onLogin={handleLogin} />} 
              />
              <Route 
                path="/signup" 
                element={<Signup onSignup={handleSignup} />} 
              />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            <AuthNav />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
