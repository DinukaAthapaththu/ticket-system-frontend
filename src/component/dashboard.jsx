import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/dashboard.css'; // Importing the CSS file for styling

function Dashboard() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    // Navigate to profile page (you can add the actual route later)
    alert('Navigating to profile...');
  };

  const handleLogout = () => {
    // Perform logout logic, e.g., clearing tokens or user info
    alert('Logging out...');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to Your Dashboard</h2>
        <div className="button-group">
          <button onClick={handleProfileClick} className="profile-btn">Profile</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="statistics">
        <h3>Statistics</h3>
        <div className="stat-item">
          <span className="stat-title">Total Users:</span>
          <span className="stat-value">1,245</span>
        </div>
        <div className="stat-item">
          <span className="stat-title">Active Users:</span>
          <span className="stat-value">987</span>
        </div>
        <div className="stat-item">
          <span className="stat-title">New Signups (Last 7 Days):</span>
          <span className="stat-value">45</span>
        </div>
        <div className="stat-item">
          <span className="stat-title">Revenue (Last Month):</span>
          <span className="stat-value">$8,450</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
