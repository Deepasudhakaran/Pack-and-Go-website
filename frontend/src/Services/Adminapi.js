import { adminInstances } from "../Axios/AdminInstance";

export const getAdminUserList = async () => {
  try {
    const response = await adminInstances.get('/admin/userlist');
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const blockUser = async (userId) => {
  console.log(userId, 'userid');
  return adminInstances.put(`/admin/block/${userId}`)

};

export const unblockUser = async (userId) => {
  console.log(userId, 'userid');
  return adminInstances.put(`/admin/unblock/${userId}`)
};

export const createPost = async (formData) => {
  try {
    console.log('FormData:', formData);
    const response = await adminInstances.post('/createpost', formData);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getAdminList = async () => {
  try {
    const response = await adminInstances.get('/admin/postlist');
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const adminLogin = async (values) => {
  try {
    const response = await adminInstances.post("/adminlogin", { ...values })
    return response.data
  } catch (error) {
    console.log('Error', error.message);
  }
};


export const adminHeader = () => {
  return adminInstances.get('/adminheader')
};

export const AdminsignUp = async (values) => {
  try {
    const response = await adminInstances.post('/adminsignup', { ...values });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    console.log('Error message:', error.message);
    throw error;
  }
};

export const getAdminDetails = async (id) => {
  try {
    const response = await adminInstances.get(`/adminpostdetails/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const getAdminReviewList = async (postId) => {
  try {
    const response = await adminInstances.get(`/adminreviewlist/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    throw error;
  }

};

export const deleteReview = async (postId) => {
  try {
    const response = await adminInstances.delete(`/adminreviewlist/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deletePost = async (id) => {
  try {
    const response = await adminInstances.delete(`/adminpostdetails/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updatePost = async (id, formData) => {
  try {
    const response = await adminInstances.put(`/updateadminpostdetails/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}





export const getAdminNotificationList = async () => {
  try {
    const response = await adminInstances.get('/admincreatemessage');
    return response.data;
  } catch (error) {
    throw error;
  }
};

