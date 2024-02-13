import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import UserLoginPage from '../Pages/User/UserLoginPage';
import UserRegisterPage from '../Pages/User/UserRegisterPage';
import UserHomePage from '../Pages/User/UserHomePage';
import Createreview from '../Components/User/Createreview/Createreview';
import TourDetailPage from '../Pages/User/TourDetailPage';
import UserContactPage from '../Pages/User/UserContactPage';
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/setUser';
import AboutPage from '../Pages/User/AboutPage';

const UserRouter = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      <Routes>
        <Route path='/userlogin' element={<UserLoginPage />} />
        <Route path='/userregister' element={<UserRegisterPage />} />
        <Route path='/' element={<UserHomePage />} />
        <Route path='/createreview/:postid' element={user.value ? <Createreview /> : <Navigate to={"/userlogin"} />} />
        <Route path='/tourDetails/:id' element={<TourDetailPage />} />
        <Route path='/Usercontactpage' element={<UserContactPage />} />
        <Route path='/about' element={<AboutPage />} />

      </Routes>
    </div>
  );
}

export default UserRouter;




