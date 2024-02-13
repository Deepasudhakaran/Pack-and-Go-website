import React from 'react';
import { Routes, Route } from "react-router-dom";
import AdminLoginPage from '../Pages/Admin/AdminLoginPage';
import AdminUserlistPage from '../Pages/Admin/AdminUserlistPage';
import AdminCreatepostPage from '../Pages/Admin/AdminCreatepostPage';
// import MapPage from '../Pages/Admin/MapPage';
import AdminPostListPage from '../Pages/Admin/AdminPostListPage';
import AdminPostDetailPage from '../Pages/Admin/AdminPostDetailPage';
import AdminUpdatePage from '../Pages/Admin/AdminUpdatePage';
import AdminAddUserpage from '../Pages/Admin/AdminAddUserpage';
import AdminNotification from '../Pages/Admin/AdminNotification';

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        
        <Route path='/AdminLogin' element={<AdminLoginPage />} />
        <Route path='/userlist' element={<AdminUserlistPage />} />
        <Route path='/createpost' element={<AdminCreatepostPage />} />
        <Route path='/adduser' element={<AdminAddUserpage />} />
        {/* <Route path='/location' element={<MapPage />} /> */}
        <Route path='/viewpost' element={<AdminPostListPage />} />
        <Route path='/adminpostdetails/:id' element={<AdminPostDetailPage />} />
        <Route path='/adminupdatepage/:id' element={<AdminUpdatePage />} />
        <Route path='/notification' element={<AdminNotification/>}/>

      </Routes>
    </div>
  );
}

export default AdminRouter;
