import axios from 'axios';
import './Auth.css';

const Dashboard = ({ user, onLogout }) => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Call onLogout callback
      onLogout();
      
      alert('Logged out successfully!');
    } catch (err) {
      console.error('Logout error:', err);
      // Even if the API call fails, clear local storage and logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      onLogout();
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Dashboard</h1>
      <div className="user-info">
        <h3>User Information:</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
      
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;