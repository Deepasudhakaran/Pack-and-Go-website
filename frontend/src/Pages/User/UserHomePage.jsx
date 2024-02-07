import React from 'react';
import Usernavbar from '../../Components/User/Navbar/Usernavbar';
import Userhome from '../../Components/User/Userhome/Userhome';
import Footer from '../../Components/User/Userfooter/Footer';

const UserHomePage = () => {
  return (
    <div>
      <Usernavbar />
      <Userhome />
      <Footer />
    </div>
  );
}

export default UserHomePage;

