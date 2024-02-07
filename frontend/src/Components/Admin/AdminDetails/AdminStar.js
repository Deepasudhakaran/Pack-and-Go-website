import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const AdminStar = ({ rating }) => {

  const stars = Array.from({ length: 5 }, (_, index) => {
    const filledStar = index + 1 <= rating;
    return filledStar ? <FaStar key={index} style={{ color: 'gold' }} /> : <FaRegStar key={index} style={{ color: '#c1bfbf' }} />;
  });

  return (
    <div>
      <div className="star-rating">
        {stars}
      </div>
    </div>
  );
}

export default AdminStar;
