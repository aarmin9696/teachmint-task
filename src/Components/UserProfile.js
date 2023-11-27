// UserProfile.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Clock from './Clock';
import UserDetails from './UserDetails';
import PostList from './PostList';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [clock, setClock] = useState(new Date());
  const [clockRunning, setClockRunning] = useState(true);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('UTC');

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user details:', error));

    // Fetch the list of countries
    axios.get('http://worldtimeapi.org/api/timezone')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));

    const intervalId = setInterval(() => {
      if (clockRunning) {
        setClock(new Date());
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [id, clockRunning]);

  const toggleClock = () => setClockRunning(!clockRunning);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <div className='top-div'>
      <button className='button'><Link to="/">Back</Link></button>
      <Clock
          clock={clock}
          running={clockRunning}
          toggleClock={toggleClock}
          countries={countries}
          selectedCountry={selectedCountry}
          handleCountryChange={handleCountryChange}
        />
        </div>
      <UserDetails user={user} />
      <PostList userId={user.id} />
    </div>
  );
};

export default UserProfile;
