import React from 'react';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './Adduser.css'
import { AdminsignUp } from '../../../Services/Adminapi';


const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Name is required')
    .min(4, 'Username must be at least 4 characters')
    .max(15, 'Username cannot be more than 15 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10,11}$/, 'Enter a valid phone number'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9].*[0-9].*[0-9].*[0-9])/,
      'Password must contain at least one special character and at least four numbers'
    )
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const Adduser = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await AdminsignUp(values);
        console.log('User registered successfully');
        toast.success('Register successful');

      } catch (error) {
        console.error('Error registering user:', error.message);
        toast.error('Error REgister in');
      }
    },
  });

  return (
    <div>
      <div className='addpage'>
        <div className='adminregi'>
          <div className='register'>
            <form onSubmit={formik.handleSubmit}>
              <div className='register-header'>
                <h1>Add User</h1><br />
              </div>

              <label>Name:</label>
              <input
                type="text"
                name="username"
                value={formik.values.username}
                placeholder="enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error-message">{formik.errors.username}</div>
              )}

              <label>Contact No:</label>
              <input
                type="text"
                name="phone"
                value={formik.values.phone}
                placeholder="enter your phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error-message">{formik.errors.phone}</div>
              )}

              <label>Email:</label>
              <input type='email'
                name='email'
                placeholder='enter the email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}


              <label>Password:</label>
              <input type='password'
                name='password'
                placeholder='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />{formik.touched.password && formik.errors.password && <div className="error-message">{formik.errors.password}</div>}

              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                placeholder="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="error-message">{formik.errors.confirmPassword}</div>
              )}


              <button type='submit'>Register</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Adduser;
