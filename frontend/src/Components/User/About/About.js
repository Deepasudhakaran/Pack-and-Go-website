import React from 'react';
import './About.css';

const About = () => {
    return (
        <div>
            <div className='zero'>
                <img src='https://www.wallpaperup.com/uploads/wallpapers/2014/01/25/237031/5a36e0e453ad494015fe21dba213fdc0-700.jpg' alt='' />
                <div className='zero-text'>
                    <h1>Make Memories</h1><br /><br />
                </div>
            </div>
            <div className='memories'>
                <h2>Unforgettable travel experiences</h2>
                <p>No matter where your travels take you, Pack&Go offers the best way to connect with your destination. Make memories all over the globe with our locally-vetted, expertly-curated experiences. From must-see iconic attractions to unexpected under-the-radar gems, we have something for everyone.</p>
            </div>
            <div className='memories'>
                <h2>Maximize your trip</h2>
                <p>We take the stress out of trip planning. Access everything in our app so you can focus on enjoying the moment, not taking care of logistics. Explore what you want to do, then count on our flexible policies and 24/7, multilingual customer support whenever you need.</p>
            </div>
            <div className='memories'>
                <h2>Find the best sights</h2>
                <p>No matter where your travels take you, GetYourGuide offers the best way to connect with your destination. Make memories all over the globe with our locally-vetted, expertly-curated experiences. From must-see iconic attractions to unexpected under-the-radar gems, we have something for everyone.</p>
            </div>
        </div>
    );
}

export default About;
