const mongoose = require('mongoose');

// Define User Schema
const User = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: true },
  },{collection: 'user-data'});
  
  // Create User model
  const model = mongoose.model('User', User);

  module.exports = model