import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import './Adminlogin.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setAdminDEtails } from '../../../Features/setAdmin';
import { adminLogin } from '../../../Services/Adminapi';


const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const Adminlogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await adminLogin(values);
        if (data.status) {
          dispatch(setAdminDEtails(data.admin));
          navigate('/admin/userlist');
          localStorage.setItem('adminToken', data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error logging in:', error.message);
        toast.error('Error logging in');
      }
    },
  });

  return (
    <div>
      <div className='login-page '>
        <div className='login'>
          <div className='adminform '>
            <form onSubmit={formik.handleSubmit}>
              <h2>Admin Login</h2><br />

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
              <button type='submit'>Login</button>

            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Adminlogin;
