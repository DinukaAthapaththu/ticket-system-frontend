import React, { useState } from 'react';

const Login = () => {
  return (
    <div style={containerStyle}>
      <form style={formStyle}>
        <h1>Login</h1>
        <div style={inputGroupStyle}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};

// Inline styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
};

const formStyle = {
  maxWidth: '300px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const inputGroupStyle = {
  marginBottom: '15px',
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Login;
