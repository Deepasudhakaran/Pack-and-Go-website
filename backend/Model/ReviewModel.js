const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config()

const reviewSchema = new Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, default: Date.now },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, 
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;





