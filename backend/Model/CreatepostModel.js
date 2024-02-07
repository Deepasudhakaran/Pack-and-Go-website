const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config()

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  highlights: {
    type: String,
    required: true,
  },
  inclusions: {
    type: String,
    required: true,
  },
  exclusion: {
    type: String,
    required: true,
  },

  information: {
    type: String,
    required: true,
  },
  file: {
    type: Object,
    required: true,
  },
  file2: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  latitude: Number,
  longitude: Number,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
