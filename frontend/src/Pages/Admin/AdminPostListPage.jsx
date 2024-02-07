import React from 'react';
import Navbar from '../../Components/Admin/adminNavbar/Navbar';
import Postlist from '../../Components/Admin/Postlist/Postlist';

const AdminPostListPage = () => {
  return (
    <div>
      <Navbar />
      <Postlist />
    </div>
  );
}

export default AdminPostListPage;
