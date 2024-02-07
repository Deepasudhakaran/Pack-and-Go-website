import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { deletePost, deleteReview, getAdminDetails, getAdminReviewList } from '../../../Services/Adminapi';
import AdminStar from './AdminStar';
import './AdminSideDeatils.css';

const AdminSideDetails = () => {
  const [postDetails, setPostDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const [reviewList, setReviewList] = useState([]);
  const [selectedStar, setSelectedStar] = useState(null);

  const fetchAdminReviewList = async (postId) => {
    try {
      const response = await getAdminReviewList(postId);

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
    fetchAdminReviewList(id);

    fetchAdminPostDetails();
  }, [id]);


  const fetchAdminPostDetails = async () => {
    try {
      setLoading(true);
      const response = await getAdminDetails(id);
      const details = response?.details || {};
      setPostDetails(details);
      fetchAdminReviewList(id);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      try {
        await deleteReview(id);
        fetchAdminReviewList(id);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Deletion canceled');
    }
  };

  const handlePostDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      try {
        await deletePost(id);
        fetchAdminPostDetails();
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Deletion canceled');
    }
  }

  return (
    <div>
      <div className='page'>
        <div className='detailpage'>
          <h1>{postDetails.title}</h1>
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

          <h3 className='experiance'>Experiance</h3>
          <table className='hello'>
            <tr>
              <th>description</th>
              <td><p>{postDetails.description}</p></td>
            </tr>
            <tr>
              <th>highlights</th>
              <td><p>{postDetails.highlights}</p></td>
            </tr>

            <tr>
              <th>inclusions</th>
              <td><p>{postDetails.inclusions}</p></td>
            </tr>
            <tr>
              <th>exclusion</th>
              <td><p>{postDetails.exclusion}</p></td>
            </tr>
            <tr>
              <th>information</th>
              <td>
                <p>{postDetails.information}</p>
              </td>
            </tr>
          </table>

          <div>
            <section id="testimonials">
              <div class="testimonial-heading">
                <h1>Customer Reviews</h1>
              </div>

              <div class="testimonial-box-container">
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

                        <AdminStar rating={user.rating} />
                      </div>

                      <div class="client-comment">
                        <p>{user.comment}</p>
                      </div>
                      <button className='btn btn-sm btn-danger ms-2' onClick={() => handleDelete(user._id)}>Delete</button>

                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

      </div>
      <Link className='btn btn-sm btn-primary' style={{ width: '150px', height: "50px", marginTop: '20px', marginBottom: '20px', textAlign:"center", fontSize:'20px' }} to={`/admin/adminupdatepage/${postDetails._id}`}>Edit</Link>
      <button className='btn btn-sm btn-danger ms-2' style={{ width: '150px', height: "50px", marginTop: '20px', marginBottom: '20px', fontSize:'20px' }} onClick={() => handlePostDelete(postDetails._id)}>Delete</button>
    </div>
  );
}

export default AdminSideDetails;
