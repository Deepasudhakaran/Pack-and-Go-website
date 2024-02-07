import React, { useEffect, useState } from 'react';
import { getAdminNotificationList } from '../../../Services/Adminapi';

const Notification = () => {
    const [notificationList, setNotificationList] = useState([]);


    const fetchNotificationList = async () => {
        try {
          const adminToken = localStorage.getItem('adminToken');
          console.log('Admin Token', adminToken);
          if (adminToken) {
    
            const response = await getAdminNotificationList(adminToken);
            if (response && response.users) {
              const users = response.users || [];
              setNotificationList(users);
            } else {
              console.error('User list not available :', response)
            }
          }
          else {
            console.error('admin Token not found in local storage');
          }
        } catch (error) {
          console.error('Error fetching user list:', error.message);
        }
      };
    
      useEffect(() => {
        fetchNotificationList();
      }, []);


    const handledelete = () =>{

    } 
  return (
    <div>
      <div className='us'>
        <div className='container'>
          <h2>User List</h2>
          <table border={1} className='table table-striped'>
            <thead>
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>Message</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {notificationList.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.message}</td>
                  <td>
                    <button onClick={() => handledelete(user._id)}  className='btn btn-sm btn-danger ms-2'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Notification;
