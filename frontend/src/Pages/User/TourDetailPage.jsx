import React from 'react';
import Usernavbar from '../../Components/User/Navbar/Usernavbar';
import Tourdetails from '../../Components/User/TourDetails/Tourdetails';
import Footer from '../../Components/User/Userfooter/Footer';


const TourDetailPage = () => {
  return (
    <div>
      <Usernavbar />
      <Tourdetails />
      <Footer />
    </div>
  );
}

export default TourDetailPage;
