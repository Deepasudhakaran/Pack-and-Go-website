const Admin = require("../Model/AdminModel");
const User = require('../Model/Userregistermodel');
const Post = require("../Model/CreatepostModel");
const maxAge = 3 * 24 * 60 * 60;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const Review = require("../Model/ReviewModel");
const Message = require("../Model/Contact");


const createAdminToken = (id) => {
  return jwt.sign({ id }, process.env.ADMIN_SECRET_KEY, {
    expiresIn: maxAge,
  });
}

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      const auth = await bcrypt.compare(password, admin.password);
      console.log(auth);
      if (auth) {
        const token = createAdminToken(admin._id);
        res.json({ message: 'Login Successfull', admin, token, status: true });
        return;
      } else {
        res.json({ message: 'Password incorrect', status: false });
        return;
      }
    } else {
      res.json({ message: 'Admin not found ', status: false })
      return;
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getUserList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching user list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




exports.blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User blocked successfully', user });
  } catch (error) {
    console.error('Error blocking user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User unblocked successfully', user });
  } catch (error) {
    console.error('Error unblocking user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.viewPost = async (req, res) => {
  try {
    const create = new Post({
      title: req.body.title,
      description: req.body.description,
      file: req.files['file'][0].filename,
      file2: req.files['file2'][0].filename,
      location: req.body.location,
      price: req.body.price,
      duration: req.body.duration,
      highlights: req.body.highlights,
      inclusions: req.body.inclusions,
      exclusion: req.body.exclusion,
      information: req.body.information,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
    await create.save();
    res.status(201).json({ message: 'Post creation successful' });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.adminHeader = async (req, res) => {
  try {
    const admin = req.admin;
    res.json({ admin: admin, status: true })
  } catch (error) {
    res.json({ message: 'internal server error', status: false })
  }
};

exports.getAdminList = async (req, res) => {
  try {
    const Adminpost = await Post.find();
    res.status(200).json({ Adminpost });
  } catch (error) {
    console.error('Error fetching post list', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAdminDetails = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Details not found' });
    }
    res.json({ details: post });
  } catch (error) {
    console.error('Error fetching post details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAdminReviewList = async (req, res) => {
  try {
    const postId = req.params.postId;
    const reviews = await Review.find({ post: postId });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.postId);
    res.json(deletedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.json(deletedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.updatePost = async (req, res) => {
  try {
    console.log('Received update request:', req.body);
    console.log('Received files:', req.files);
    const { title, location, price, duration, description, highlights, inclusions, exclusion, information, latitude, longitude } = req.body;
    const { file, file2 } = req.files || {};
    const updateObject = {
      title, location, price, duration, description, highlights, inclusions, exclusion, information, latitude, longitude
    };
    if (file) {
      updateObject.file = file[0].filename;
    }
    if (file2) {
      updateObject.file2 = file2[0].filename;
    }
    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      updateObject,
      { new: true }
    );
    res.json(updatePost);
    console.log('Post updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.AdminsignUp = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phone,
    });
    await newUser.save();
    const token = createAdminToken(newUser._id);
    console.log('User registered successfully:', newUser, token);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};







exports.getAdminNotifionList = async (req, res) => {
  try {
    const users = await Message.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching user list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




exports.deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    res.json(deletedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





