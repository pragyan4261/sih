const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift.model');
const User = require('../models/Users.model');

// Shifts Endpoints

// Get all shifts
router.get('/', async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new shift
router.post('/', async (req, res) => {
  const shift = new Shift({
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    location: req.body.location,
    foreman_name: req.body.foreman_name,
  });

  try {
    const newShift = await shift.save();
    res.status(201).json(newShift);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a shift by ID
router.get('/:id', async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) return res.status(404).json({ message: 'Shift not found' });
    res.json(shift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Users Endpoints

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
router.post('/users', async (req, res) => {
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
    res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
