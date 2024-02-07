import React, { useState } from 'react';
import { handleSearch } from '../../../Services/Userapi';
import { useNavigate } from 'react-router-dom';
import './Search.css';


const Usersearch = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate('');

  const onSearch = async () => {
    try {
      if (location.trim() === '') {
        setResults([]);
        return;
      }
      const response = await handleSearch({ location: location });
      if (Array.isArray(response)) {
        setResults(response);
      } else {
        console.error('handleSearch did not return an array:', response);
        setResults([]);
      }
    } catch (error) {
      console.error('Error in onSearch:', error.message);
      setResults([]);
    }
  };
  const onSuggestionClick = (company) => {
    navigate('/');
  };
  return (
    <div>
      <div>
        <div className="body-search">
          <div>
            <h2 className="title">LOCATION</h2>
            <div className="search-container">
              <input
                className="search-input"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search for a place..."
              />
              <button onClick={onSearch} className="button-search">
                Search
              </button>
            </div>

            <ul className="suggestion-list">
              {results.map((location, index) => (
                <li key={index} onClick={() => onSuggestionClick(location)}>
                  <div className="suggestion-card">
                    <div className="suggestion-details">
                      <h3 className="company-name">{location.location}</h3>
                      <p> {location.tittle}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usersearch;
