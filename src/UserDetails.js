import React, { useState, useEffect } from 'react';

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

  export default UserDetails;