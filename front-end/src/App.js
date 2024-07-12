import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './App.scss';
const App = () => {
  const dispatch = useDispatch();
  const { userInfo, error } = useSelector(state => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  
  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      dispatch({ type: "SET_ERROR", payload: null });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.response.data });
    }
  };

  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      const decodedToken = jwtDecode(token);

      const response = await axios.get('http://localhost:5000/api/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);

      dispatch({ type: "SET_USER_INFO", payload: decodedToken });
    } catch (error) {
      console.error('Error fetching user info:', error.message);
    }
  };

  const logout = () => {
    setToken(null);
    dispatch({ type: "SET_USER_INFO", payload: null });
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  })

  return (
    <div className="App">
      <h1>Login using JWT</h1>
      {!token ? (
        <div className='loginForm'>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <div className='userInfo'>
          <p>Welcome, {userInfo?.username}!</p>
          <p>Role: {userInfo?.role}</p>
          <button onClick={getUserInfo}>Get User Info</button>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
