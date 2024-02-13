import React, { useEffect, useState } from 'react';
import { Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';

import './Postlist.css';
import Navbar from '../adminNavbar/Navbar';
import { getAdminList } from '../../../Services/Adminapi';

const Postlist = () => {
    const [postList, setPostList] = useState([]); 

    const fetchPostList = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        if(adminToken) {

        const response = await getAdminList (adminToken);
        if(response && response.Adminpost){
        const Adminpost = response.Adminpost || [];
        setPostList(Adminpost);
        } else{
          console.error('Post list not available :', response);
        }
      }
      else{
        console.error('admin Token not found in local storage');
      }



      } catch (error) {
        console.error('Error fetching user list:', error.message);
      }
    };
  
    useEffect(() => {
      
      fetchPostList();
    }, []);
  return (
    <div>
        <Navbar/>
        <div className='mh'>
      <div className='cd'>
         
{postList.map((user) => (
        <div key={user._id}>
        
      <Card style={{width:'15rem',display:'inline-block'} }>
      <Card.Img 
      style={{height:'13rem'}}
      className='p-2'
      variant="top"
      src={`http://localhost:8080/img/${user.file}`}/>


      <Card.Body>
        <Card.Title>{user.title}</Card.Title>
        <div>
        <p >{user.location}</p>
        </div>
        <Link to={`/admin/adminpostdetails/${user._id}`} variant='primary' style={{backgroundColor:"blue"}} className='hcard' >More details</Link>
      </Card.Body>
    </Card>
</div>
      ))}
      
      </div>
      </div>
    </div>
  );
}

export default Postlist;
