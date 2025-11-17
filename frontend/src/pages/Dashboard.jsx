import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, protectedAPI } from "../api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchDashboardStats();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data.user);
    } catch (err) {
      setError("Failed to fetch user data");
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await protectedAPI.getDashboard();
      setStats(response.data.data);
    } catch (err) {
      setError("Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchProfile = async () => {
    try {
      const response = await protectedAPI.getProfile();
      setUser(response.data.user);
    } catch (err) {
      setError("Profile fetch failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  const fetchAdminPanel = async () => {
    try {
      const response = await protectedAPI.getAdminPanel();
      console.log("Admin data:", response.data);
    } catch (err) {
      setError("Admin access denied: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {user && (
        <div className="user-welcome">
          <div className="welcome-card">
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h2>Welcome back, {user.username}!</h2>
              <p>{user.email}</p>
              <p className="member-since">
                Member since: {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{stats.total_users}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">✨</div>
            <div className="stat-content">
              <h3>{stats.active_users}</h3>
              <p>Active Users</p>
            </div>
          </div>
        </div>
      )}

      <div className="action-buttons">
        <button className="action-button primary" onClick={fetchProfile}>
          Refresh Profile
        </button>
        <button className="action-button secondary" onClick={fetchAdminPanel}>
          Admin Panel
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
