import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDetails, getUserReviewList } from '../../../Services/Userapi';
import './Tourdetails.css';
import Star from '../Star/Star';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Tourdetails = () => {
  const [postDetails, setPostDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  

  const [reviewList, setReviewList] = useState([]);
  const [selectedStar, setSelectedStar] = useState(null);

  const fetchReviewList = async (postId) => {
    try {
      const response = await getUserReviewList(postId);

      if (response && response.reviews) {
        const reviews = response.reviews || [];
        setReviewList(reviews);
      } else {
        console.error('Review list not available:', response);
      }
    } catch (error) {
      console.error('Error fetching review list:', error.message);
    }
  };

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        if (userToken) {

          setLoading(true);
          const response = await getDetails(id, userToken);
          if (response && response.details) {
            const details = response?.details || {};
            setPostDetails(details);
            fetchReviewList(id);
          } else {
            console.error('Details not available :', response);
          }
        } else {
          console.error('userToken not found in local Storage');
        }

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleStarFilter = (star) => {
    setSelectedStar(star === selectedStar ? null : star);
  };

  const filteredReviews = selectedStar
    ? reviewList.filter((review) => review.rating === selectedStar)
    : reviewList;
  return (
    <div className='detailpage'>
      <h1 className='detailhead'>{postDetails.title}</h1>
      <div class="image-container">
        <img src={`http://localhost:8080/img/${postDetails.file}`} alt='' />
        <img src={`http://localhost:8080/img/${postDetails.file2}`} alt='' />
      </div>

      <div className="row about-list">
        <div className="media">
          <label>Location</label>
          <p>{postDetails.location}</p>
        </div>

        <div className="media">
          <label>Price</label>
          <p>{postDetails.price}</p>
        </div>
        <div className="media">
          <label>Duration</label>
          <p>{postDetails.duration}</p><br /><br />
        </div>
      </div>
      <h2 className='experiance'>Experience</h2>
      <table className='hello'>
        <tr>
          <th>Description</th>
          <td><p>{postDetails.description}</p></td>
        </tr>
        <tr>
          <th>Highlights</th>
          <td><p>{postDetails.highlights}</p></td>
        </tr>

        <tr>
          <th>Inclusions</th>
          <td><p>{postDetails.inclusions}</p></td>
        </tr>
        <tr>
          <th>Exclusion</th>
          <td><p>{postDetails.exclusion}</p></td>
        </tr>
        <tr>
          <th>Information</th>
          <td>
            <p>{postDetails.information}</p>
          </td>
        </tr>
      </table>

      <div>
        <section id="testimonials">
          <div class="testimonial-heading">
            <h1 className='customer-review'>Customer Reviews</h1>
            <Link to={`/createreview/${id}`} className='craete'>Add Review</Link>
          </div>
          <div className="review-star-filter">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star === selectedStar ? 'selected' : ''}`}
                onClick={() => handleStarFilter(star)}
              >
                ★
              </span>
            ))}
          </div><br />

          <div class="testimonial-box-container">
            {filteredReviews.map((user, index) => (
              <div key={user._id}>
                <div class="testimonial-box">
                  <div class="box-top">
                    <div class="profile">
                      <div class="name-user">
                        <strong>{user.name}</strong>
                        <p>{user.date}</p>
                      </div>
                    </div>
                    <Star rating={user.rating} />
                  </div>
                  <div class="client-comment">
                    <p>{user.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>
      </div>

      <div className='gmap-frame'>
        <h1 >Location</h1>
      </div>
      <div className='map-section'>
        <div className="map-container">
          <MapContainer
            center={[postDetails.latitude, postDetails.longitude]}
            zoom={13}
            style={{ height: '400px', width: '50%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[postDetails.latitude, postDetails.longitude]}>
              <Popup>{postDetails.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

    </div>

  );
};

export default Tourdetails;






