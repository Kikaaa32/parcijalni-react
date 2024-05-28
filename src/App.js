import React, { useState, useEffect } from 'react';
//import UserDetails from './UserDetails';
import "./App.css";

function UserDetails({ userData }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchUserRepos();
  }, [userData]);

  const fetchUserRepos = async () => {
    try {
      const response = await fetch(userData.repos_url);
      const data = await response.json();
      setRepos(data);
    } catch (error) {
      console.error('Error fetching user repos:', error);
    }
  };

  return (
    <div className='details'>
      <div className='userImage'>
        <img src={userData.avatar_url} alt="User Avatar" /> 
        <label><b>{userData.name}</b></label>
      </div>
      <p><b>BIO:</b> {userData.bio}</p>
      <p><b>LOCATION:</b> {userData.location}</p>
      <p><b>REPOSITORIES:</b></p>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

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