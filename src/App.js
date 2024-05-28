import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import "./App.css";

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleReset = (event) => {
    setUsername('');
    setUserData(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUserData();
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="app">
      <label>Github username:</label>
      <form onSubmit={handleSubmit}>
        <input className="input" type="text" value={username} onChange={handleChange} placeholder="e.g. facebook" />
        <button className="submit" type="submit">Search</button>
        <button className="reset" onClick={handleReset}>Reset</button>
      </form>
      {userData && <UserDetails userData={userData} />}
    </div>
  );
}

export default App;