const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/Users.model');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mine-management')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


//Register endpoint
app.post('/api/register', async (req, res) => {

  try {
    // const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        phone: req.body.phone,
    });
    res.json({ status: 'ok' });
} catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' });
}
});

// Define routes
app.use('/api/shifts', require('./routes/shifts'));
// app.use('/api/register', require('./routes/users')); // Routing the user registration

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
