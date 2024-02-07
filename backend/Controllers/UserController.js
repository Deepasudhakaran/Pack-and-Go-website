
const Post = require('../Model/CreatepostModel');
const User = require('../Model/Userregistermodel');
const bcrypt = require('bcrypt');
const maxAge = 3 * 24 * 60 * 60;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Review = require('../Model/ReviewModel');
const Message = require('../Model/Contact');

require('dotenv').config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
}

exports.signUp = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phone,
    });
    await newUser.save();
    const token = createToken(newUser._id);
    console.log('User registered successfully:', newUser, token);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isBlocked) {
      return res.status(401).json({ message: 'Account is blocked. Contact admin for assistance.' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = createToken(user._id);
    console.log('User logged successfully. Token:', token);
    res.status(200).json({ message: 'Login successful', user, token, status: true });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getPostList = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching user list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.handleSearch = async (req, res) => {
  const { location } = req.body;

  try {
    const regex = new RegExp(location, 'i');
    const results = await Post.find({ location: regex }).select('title location file');
    res.json(results);
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.userHeader = async (req, res) => {
  try {
    const user = req.user;
    res.json({ user: user, status: true })
  } catch (error) {
    res.json({ message: 'internal server error', status: false })
  }
};

exports.getDetails = async (req, res) => {
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



exports.Createuserreview = async (req, res) => {
  try {
    const { name, comment, rating } = req.body;
    const postId = req.params.postId;
    if (!name || !comment || !rating || !postId) {
      return res.status(400).json({ message: 'Name, comment, and rating are required' });
    }
    const post = await Post.findById(postId).populate('reviews');
    if (!post) {
      throw new Error('Post not found');
    }
    const review = new Review({
      name: name,
      comment: comment,
      rating: rating,
      date: new Date(),
      post: postId,
    });
    try {
      await review.validate();
    } catch (validationError) {
      console.error('Error creating review:', validationError.message);
      return res.status(400).json({ message: 'Invalid review data', error: validationError });
    }
    await review.save();
    post.reviews.push(review);
    await post.save();
    return res.status(201).json({ message: 'Review creation successful' });
  } catch (error) {
    console.error('Error creating review:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


exports.getUserReviewList = async (req, res) => {
  try {
    const postId = req.params.postId;
    const reviews = await Review.find({ post: postId });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


exports.Createusermessage = async (req, res) => {
  try {
    const create = new Message({
      name: req.body.name,
      message: req.body.message,
    });
    await create.save();
    res.status(201).json({ message: 'message creation successful' });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



