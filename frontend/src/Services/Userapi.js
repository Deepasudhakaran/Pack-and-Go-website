import { UserIntances } from "../Axios/UserInstance";

export const userSignUp = async (values) => {
  try {
    const response = await UserIntances.post('/signup', { ...values });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    console.log('Error message:', error.message);
    throw error;
  }
};


export const userLogin = async (userData) => {
  try {
    const response = await UserIntances.post('/login', userData);
    return response.data;
  } catch (error) {
    console.log('Error logging in:', error.message);
    throw error;
  }
};


export const getPostList = async () => {
  try {
    const response = await UserIntances.get('/user/postlist');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userHeader = () => {
  return UserIntances.get('/userheader')
};


export const getDetails = async (id) => {
  try {
    const response = await UserIntances.get(`/postdetails/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const Createuserreview = async (postId, postData) => {
  // console.log(postId, "11111")
  try {
    console.log('FormData:', postData);
    const response = await UserIntances.post(`/createreview/${postId}`, { ...postData, postId });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    console.error('Error Details:', error.response ? error.response.data : error);
    throw error;
  }
};


export const getUserReviewList = async (postId) => {
  try {
    const response = await UserIntances.get(`/reviewlist/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    throw error;
  }

};


export const handleSearch = async (location) => {
  try {
    const response = await UserIntances.post('/search', { location: location });
    return response.data;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};





export const Createusermessage = async (postData) => {
  try {
    console.log('postData:', postData);
    const response = await UserIntances.post('/createmessage', postData);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
};





