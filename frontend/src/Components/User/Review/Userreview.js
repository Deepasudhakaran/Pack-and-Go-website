// import React from 'react';
// import  { useEffect, useState } from 'react';
// import './Review.css';
// import { getUserReviewList } from '../../../Services/Userapi';

// import Star from '../Star/Star';
// import { Link } from 'react-router-dom';

// const Userreview = ({ postid }) => {
//     const [reviewList, setReviewList] = useState([]);
//     const [selectedStar, setSelectedStar] = useState(null);
  
//     const fetchReviewList = async () => {
//       try {
//         const response = await getUserReviewList(postid);
  
//         if (response && response.users) {
//           const users = response.users || [];
//           setReviewList(users);
//         } else {
//           console.error('Review list not available:', response);
//         }
//       } catch (error) {
//         console.error('Error fetching review list:', error.message);
//       }
//     };
  
//     useEffect(() => {
//       fetchReviewList();
//     }, [postid]);
  
//     const handleStarFilter = (star) => {
//       setSelectedStar(star === selectedStar ? null : star);
//     };
  
//     const filteredReviews = selectedStar
//       ? reviewList.filter((review) => review.rating === selectedStar)
//       : reviewList;
  

//   return (
//     <div>
//       <div>
//       <section id="testimonials">
//         <div class="testimonial-heading">
//           <h1>Customer Reviews</h1>
//           <Link to={`/createreview/${postid}`} className='craete'>Add Review</Link>
//         </div>

//         <div class="testimonial-box-container">
//           {/* Star Filter */}
//           <div className="review-star-filter">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <span
//             key={star}
//             className={`star ${star === selectedStar ? 'selected' : ''}`}
//             onClick={() => handleStarFilter(star)}
//           >
//             ★
//           </span>
//         ))}
//       </div>

//           {filteredReviews.map((user, index) => (
//             <div key={user._id}>
//               <div class="testimonial-box">
//                 <div class="box-top">
//                   <div class="profile">
//                     <div class="name-user">
//                       <strong>{user.name}</strong>
//                       <p>{user.date}</p>
//                     </div>
//                   </div>
//                   <Star rating={user.rating} />
//                 </div>
//                 <div class="client-comment">
//                   <p>{user.comment}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//     </div>
//   );
// }

// export default Userreview;





