import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Userlogin.css'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { userLogin } from '../../../Services/Userapi';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../../../Features/setUser';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const Userlogin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (userData) => {
      try {
        const data = await userLogin(userData)
        console.log(userData, '111111');
        if (data.status) {
          dispatch(setUserDetails(data.user));
          navigate('/');
          localStorage.setItem('userToken', data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }



      } catch (error) {
        console.log('Error logging in:', error.message);
        toast.error('Error logging in');
      }
    },
  });

  return (
    <div className='logimage'>
      <div className='login-page '>
        <div className='login'>
          <div className='userform'>
            <form onSubmit={formik.handleSubmit}>
              <h2>User Login</h2><br />
              <label>Email</label>
              <input
                type='email'
                name='email'
                placeholder='enter the email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}

              <label>Password</label>
              <input
                type='password'
                name='password'
                placeholder='********'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />{formik.touched.password && formik.errors.password && <div className="error-message">{formik.errors.password}</div>}

              <button>Login</button>
              <p className='ptag'>Don't have an account? <Link to='/userregister'>Register</Link></p>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Userlogin;
