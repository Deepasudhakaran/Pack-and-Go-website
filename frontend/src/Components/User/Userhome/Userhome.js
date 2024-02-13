import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap'
import './Userhome.css';
import './Search.css';
import Usernavbar from '../Navbar/Usernavbar';
import { Link, useNavigate } from 'react-router-dom';
import { getPostList, handleSearch } from '../../../Services/Userapi';

const Userhome = () => {
  const [postList, setPostList] = useState([]);
  const [location, setLocation] = useState('');
  const navigate = useNavigate('');

  const fetchPostList = async () => {
    try {
      const response = await getPostList();
      if (response && response.posts) {
        const posts = response.posts || [];
        setPostList(posts);
      } else {
        console.error('Post list not available:', response);
      }
    } catch (error) {
      console.error('Error fetching post list:', error.message);
    }
  };

  useEffect(() => {
    fetchPostList();
  }, []);

  const onSearch = async (searchQuery) => {

    try {
      if (searchQuery.trim() === '') {
        fetchPostList();
        return;
      }
      const response = await handleSearch({ location: searchQuery });
      console.log('Response from handleSearch:', response)
      if (Array.isArray(response)) {
        const filteredSuggestions = response.filter((location) =>
          location.location?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log('Filtered suggestions:', filteredSuggestions);
        setPostList(filteredSuggestions);
      } else {
        console.error('handleSearch did not return an array:', response);
        setPostList([]);
      }
    } catch (error) {
      console.error('Error in onSearch:', error.message);
      setPostList([]);
    }
  };
  const onInputChange = (event) => {
    const value = event.target.value;
    setLocation(value);
    onSearch(value);
  };
  const onSuggestionClick = (location) => {
    navigate('/', { state: { location: location.location } });
  };
  return (
    <div>
      <Usernavbar />
      <div>
        <div className='hero'>
          <img src='https://www.pixelstalk.net/wp-content/uploads/2016/08/Travel-Images-For-Desktop.jpg' alt='' />
          <div className='hero-text'>
            <h1>Your Journey Your Story</h1><br /><br />

            <h2 className="title">LOCATION</h2>
            <div className="search-container">
              <input
                className="search-input"
                type="text"
                value={location}
                onChange={onInputChange}
                placeholder="Search for a place..."
              />
              <button onClick={onSearch} className="button-search" style={{ backgroundColor: "rgb(255, 94, 0)" }}>
                Search
              </button>
            </div>
          </div>
        </div>

        <h1 className='cardhead'>Continue planning</h1>
        <div className='cd'>
          {postList.map((user, index) => (
            <div key={user._id}>
              <div key={index} onClick={() => onSuggestionClick(location)}></div>
              <Card style={{ width: '15rem', display: 'inline-block' }}>
                <Card.Img
                  style={{ height: '13rem' }}
                  className='p-2'
                  variant="top"
                  src={`http://localhost:8080/img/${user.file}`}
                />
                <Card.Body>
                  <Card.Title>{user.title}</Card.Title>
                  <div>
                    <p >{user.location}</p>
                  </div>
                  <Link to={`/tourdetails/${user._id}`} variant='primary' style={{ backgroundColor: "rgb(255, 94, 0)", border: "2px solid black " }} className='hcard' >More details</Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Userhome;


