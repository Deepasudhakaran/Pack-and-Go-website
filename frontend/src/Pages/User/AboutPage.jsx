import React from 'react';

import About from '../../Components/User/About/About';
import Footer from '../../Components/User/Userfooter/Footer';
import Usernavbar from '../../Components/User/Navbar/Usernavbar';

const AboutPage = () => {
    return (
        <div>
            <Usernavbar />
            <About />
            <Footer />
        </div>
    );
}

export default AboutPage;
