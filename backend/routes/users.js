const express = require('express');
const router = express.Router();
const User = require('../models/Users.model'); // Import the User model

// Register a new user
router.post('/', async (req, res) => {
  const { username, email, password, role, phone } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create a new user and save to the database
    const newUser = new User({ username, email, password, role, phone });
    await newUser.save();

    // Send success response
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

// Optionally, add routes to get users, delete, or update users

module.exports = router;
