import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Usernavbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserDetails } from '../../../Features/setUser';
import { userHeader } from '../../../Services/Userapi';

const Usernavbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [click , setClickes] = useState("")
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

  const handleClick = () => {
    setClickes(!click)
}
  
  return (
    <div>
      <div className="NavbarItems">
        <h2 className='navlogo'>
          Pack<span>&</span>Go</h2>
          <div className="menu-icons" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} style={{color:"black"}}></i>
        </div>

        <ul onClick={handleClick}
          className={click ? 'nav-menu active' : 'nav-menu'}>
            
          <li>
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li>
            <Link to="/about" className="nav-links">About</Link>
          </li>
          <li>
            <Link to="/Usercontactpage" className="nav-links">Contact</Link>
          </li>
          <li>
            {user.value ? (
              <div>
                <button onClick={handleLogout} className="logout">Logout</button>
              </div>
            ) : (
              <Link to="/userregister" style={{color:'white'}} className="login2">Register</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Usernavbar;
