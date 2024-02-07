import React from 'react';
import './Map.css'

const Map = () => {
  return (
    <div>
     <div className='map-section'>
        <div className='gmap-frame'>
          <h2>Location</h2>
          <iframe
            title="Tourism Map"
            width="50%"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=kerala,malappuram+(Tourism)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.maps.ie/population/">Calculate population in area</a>
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Map;
