import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Createuserreview } from '../../../Services/Userapi';
import './Createreview.css';
import { useParams } from 'react-router-dom';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  comment: Yup.string().required('comment is required'),
  rating: Yup.number().required('Rating is required').min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
});


const Createreview = () => {
  const postId = useParams().postid
  const formik = useFormik({

    initialValues: {
      name: '',
      comment: '',
      rating: 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const postData = {
          name: values.name,
          comment: values.comment,
          rating: values.rating,
          date: new Date().toLocaleString(),
        };
        const response = await Createuserreview(postId, postData);
        console.log('Review created successfully:', response);
        toast.success('create successful');
      } catch (error) {
        console.error('Error create:', error.message);
        toast.error('Error creating Review ');
      }
    },
  });

  return (
    <div>
      <div className='back'>
        <div className='cont'>
          <h2 className='create_head'>Write a Review</h2><br />
          <form onSubmit={formik.handleSubmit}>
            <label >Name</label>
            <div className="mb-3">

              <input
                type="text"
                placeholder="name"
                name="name"
                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
              <br />
            </div>
            <div className="mb-3">
              <label >Comment</label>
              <textarea
                name="comment"
                id="comment"
                className={`form-control ${formik.touched.comment && formik.errors.comment ? 'is-invalid' : ''}`}
                placeholder="Enter Comment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.comment}
              />
              {formik.touched.comment && formik.errors.comment && (
                <div className="invalid-feedback">{formik.errors.comment}</div>
              )}
              <br />
            </div>
            <div className="mb-3">
              <label>Rating</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                className={`form-control ${formik.touched.rating && formik.errors.rating ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rating}
              />
              {formik.touched.rating && formik.errors.rating && (
                <div className="invalid-feedback">{formik.errors.rating}</div>
              )}
              <br />
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Createreview;




