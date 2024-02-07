import React from 'react';
import UserList from '../../Components/Admin/Home/UserList';
import Navbar from '../../Components/Admin/adminNavbar/Navbar';

const AdminUserlistPage = () => {
  return (
    <div>
      <Navbar />
      <UserList />
    </div>
  );
}

export default AdminUserlistPage;
