import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Usernavbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserDetails } from '../../../Features/setUser';
import { userHeader } from '../../../Services/Userapi';

const Usernavbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    userHeader()
      .then((res) => {
        dispatch(setUserDetails(res.data));
      })
      .catch((error) => {
        console.error('error fetching admin data :', error);
      });

  }, [dispatch]);
  const handleLogout = () => {
    dispatch(setUserDetails(""));
  };
  return (
    <div>
      <div className="user-nav">
        <h2 className='navlogo'>
          Pack<span>&</span>Go</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Usercontactpage">Contact</Link>
          </li>
          <li>
            {user.value ? (
              <div>
                <button onClick={handleLogout} className="logout">Logout</button>
              </div>
            ) : (
              <Link to="/userregister" className="logout">Register</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Usernavbar;
