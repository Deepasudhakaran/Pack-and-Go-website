import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { useDispatch } from 'react-redux';
import { adminHeader } from '../../../Services/Adminapi';
import { LoginAdmin, LogoutAdmin } from '../../../Features/setAdmin';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    adminHeader()
      .then((res) => {
        dispatch(LoginAdmin(res.data));
      })
      .catch((error) => {
        console.error('error fetching admin data :', error);
      });

  }, [dispatch]);

  const handleLogut = () => {
    dispatch(LogoutAdmin(null));
    navigate('/admin/AdminLogin');
  };
  return (
    <div>
      <div className="admin-nav">
        <ul>
          <li>
            <Link to="/admin/adduser">REGISTER</Link>
          </li>
          <li>
            <Link to="/admin/userlist">USER LIST</Link>
          </li>
          <li>
            <Link to="/admin/createpost">CREATEPOST</Link>
          </li>
          <li>
            <Link to='/admin/Viewpost'>POST LIST</Link>
          </li>
          <li>
            <Link to='/admin/notification'>NOTIFICATION</Link>
          </li>
          <li>
            <button onClick={handleLogut} className="logout-company">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
