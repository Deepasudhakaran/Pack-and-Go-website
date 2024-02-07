import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


// import Homepage from '../Components/Homepage';


import UserLoginPage from '../Pages/User/UserLoginPage';
import UserRegisterPage from '../Pages/User/UserRegisterPage';
import UserHomePage from '../Pages/User/UserHomePage';


import Createreview from '../Components/User/Createreview/Createreview';
import TourDetailPage from '../Pages/User/TourDetailPage';
import Userreview from '../Components/User/Review/Userreview';
import UserContactPage from '../Pages/User/UserContactPage';
import Usersearch from '../Components/User/Search/Usersearch';
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/setUser';
import About from '../Components/User/About/About';

const UserRouter = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      <Routes>
        <Route path='/userlogin' element={<UserLoginPage />} />
        <Route path='/userregister' element={<UserRegisterPage />} />
        <Route path='/' element={<UserHomePage />} />
        <Route path='/search' element={<Usersearch />} />
        <Route path='/review' element={<Userreview />} />
        <Route path='/createreview/:postid' element={user.value ? <Createreview /> : <Navigate to={"/userlogin"} />} />
        <Route path='/tourDetails/:id' element={<TourDetailPage />} />
        <Route path='/Usercontactpage' element={<UserContactPage />} />
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  );
}

export default UserRouter;




