import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createPost } from '../../../Services/Adminapi';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './Createpost.css';


const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  location: Yup.string().required('Location is required'),
  price: Yup.number().required('Price is required'),
  duration: Yup.string().required('Duration is required'),
  latitude: Yup.number().required('Latitude is required'),
  longitude: Yup.number().required('Longitude is required'),
  description: Yup.string().required('Description is required'),
  highlights: Yup.string().required('highlights is required'),
  inclusions: Yup.string().required('inclusions is required'),
  exclusion: Yup.string().required('exclusion is required'),
  information: Yup.string().required('information is required'),
  file: Yup.mixed().required('File is required').test(
    'fileType',
    'Only image files are allowed (jpeg, png, gif)',
    (value) => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
  ),
  file2: Yup.mixed().required('File is required').test(
    'fileType',
    'Only image files are allowed (jpeg, png, gif)',
    (value) => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
  ),

});
const Createpost = () => {

  const formik = useFormik({
    initialValues: {
      title: '',
      location: '',
      price: '',
      duration: '',
      description: '',
      highlights: '',
      inclusions: '',
      exclusion: '',
      information: '',
      file: null,
      file2: null,
      latitude: '',
      longitude: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('location', values.location);
        formData.append('price', values.price);
        formData.append('duration', values.duration);
        formData.append('latitude', values.latitude);
        formData.append('longitude', values.longitude);
        formData.append('description', values.description);
        formData.append('highlights', values.highlights);
        formData.append('inclusions', values.inclusions);
        formData.append('exclusion', values.exclusion);
        formData.append('information', values.information);
        formData.append('file', values.file);
        formData.append('file2', values.file2);

        await createPost(formData);
        console.log('post create successfully');
        toast.success(' create successful');

      } catch (error) {
        console.error('Error create:', error.message);
        toast.error('Error creating post in');
      }
    },
  });
  return (
    <div>

      <div className='pf-card'>

        <form onSubmit={formik.handleSubmit}>
          <h1>Create Post</h1>
          <div class="row">
            <div class="col">
              <input
                type="text"
                placeholder="Title"
                name="title"
                className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="invalid-feedback">{formik.errors.title}</div>
              )}
              <br />
            </div>

            <div class="col">
              <input
                type="text"
                placeholder="Location"
                name="location"
                className={`form-control ${formik.touched.location && formik.errors.location ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
              />
              {formik.touched.location && formik.errors.location && (
                <div className="invalid-feedback">{formik.errors.location}</div>
              )}
              <br />
            </div>
          </div><br />

          <div class="row">
            <div class="col">
              <input
                type="text"
                placeholder="Price"
                name="price"
                className={`form-control ${formik.touched.price && formik.errors.price ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="invalid-feedback">{formik.errors.price}</div>
              )}
              <br />
            </div>

            <div class="col">
              <input
                type="text"
                placeholder="Duration"
                name="duration"
                className={`form-control ${formik.touched.duration && formik.errors.duration ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.duration}
              />
              {formik.touched.duration && formik.errors.duration && (
                <div className="invalid-feedback">{formik.errors.duration}</div>
              )}
              <br />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <input
                type="text"
                placeholder="Latitude"
                name="latitude"
                className={`form-control ${formik.touched.latitude && formik.errors.latitude ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.latitude}
              />
              {formik.touched.latitude && formik.errors.latitude && (
                <div className="invalid-feedback">{formik.errors.latitude}</div>
              )}
              <br />
            </div>

            <div class="col">
              <input
                type="text"
                placeholder="Longitude"
                name="longitude"
                className={`form-control ${formik.touched.longitude && formik.errors.longitude ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.longitude}
              />
              {formik.touched.longitude && formik.errors.longitude && (
                <div className="invalid-feedback">{formik.errors.longitude}</div>
              )}
              <br />
            </div>
          </div>

          <textarea
            name="highlights"
            id="highlights"
            cols="30"
            rows="5"
            className={`form-control ${formik.touched.highlights && formik.errors.highlights ? 'is-invalid' : ''}`}
            placeholder="Enter highlights"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.highlights}
          />
          {formik.touched.highlights && formik.errors.highlights && (
            <div className="invalid-feedback">{formik.errors.highlights}</div>
          )}
          <br />

          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
            placeholder="Enter Description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="invalid-feedback">{formik.errors.description}</div>
          )}
          <br />

          <textarea
            name="inclusions"
            id="inclusions"
            cols="30"
            rows="5"
            className={`form-control ${formik.touched.inclusions && formik.errors.inclusions ? 'is-invalid' : ''}`}
            placeholder="Enter Inclusions"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.inclusions}
          />
          {formik.touched.inclusions && formik.errors.inclusions && (
            <div className="invalid-feedback">{formik.errors.inclusions}</div>
          )}
          <br />


          <textarea
            name="exclusion"
            id="exclusion"
            cols="30"
            rows="5"
            className={`form-control ${formik.touched.exclusion && formik.errors.exclusion ? 'is-invalid' : ''}`}
            placeholder="Enter Exclusions"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.exclusion}
          />
          {formik.touched.exclusion && formik.errors.exclusion && (
            <div className="invalid-feedback">{formik.errors.exclusion}</div>
          )}
          <br />

          <textarea
            name="information"
            id="information"
            cols="30"
            rows="5"
            className={`form-control ${formik.touched.information && formik.errors.information ? 'is-invalid' : ''}`}
            placeholder="Important information"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.information}
          />
          {formik.touched.information && formik.errors.information && (
            <div className="invalid-feedback">{formik.errors.information}</div>
          )}
          <br />

          <input
            type="file"
            name="file"
            id="file"
            className={`form-control ${formik.touched.file && formik.errors.file ? 'is-invalid' : ''}`}
            accept="image/jpeg, image/png, image/gif"
            onChange={(event) => formik.setFieldValue('file', event.currentTarget.files[0])}
          />
          {formik.touched.file && formik.errors.file && (
            <div className="invalid-feedback">{formik.errors.file}</div>
          )}
          <br />

          <input
            type="file"
            name="file2"
            id="file2"
            className={`form-control ${formik.touched.file2 && formik.errors.file2 ? 'is-invalid' : ''}`}
            accept="image/jpeg, image/png, image/gif"
            onChange={(event) => formik.setFieldValue('file2', event.currentTarget.files[0])}
          />
          {formik.touched.file2 && formik.errors.file2 && (
            <div className="invalid-feedback">{formik.errors.file2}</div>
          )}
          <br />
          <div>
            <button className='sedit' type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>

  );
}

export default Createpost;




