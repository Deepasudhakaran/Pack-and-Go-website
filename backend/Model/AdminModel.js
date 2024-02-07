const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config()
const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [{ type: String }],

})

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;