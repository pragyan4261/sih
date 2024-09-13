const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Worker = require('./models/worker.model');
const BlastingLog = require('./models/blastinglog.model');
const ProgressLog = require('./models/progresslog.model')
const Tool = require('./models/equipment.model');
const Report = require('./models/report.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database connected successfully'))
.catch((err) => console.error('Database connection error:', err));;
mongoose.set('strictQuery', true);

app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' });
    }
});
// GET endpoint to fetch all users
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user details" });
    }
});
app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid login' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
                _id: user._id
            },
            process.env.JWT_SECRET
        );

        return res.json({ status: 'ok', user: token });
    } else {
        return res.json({ status: 'error', user: false });
    }
});
// Route to add a new worker
app.post('/api/workers', async (req, res) => {
    const { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
        return res.status(400).json({ error: 'Name and phone number are required' });
    }

    try {
        const newWorker = new Worker({ name, phoneNumber });
        await newWorker.save();
        res.status(201).json(newWorker);  // Respond with the saved worker
    } catch (err) {
        console.error('Error adding worker:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get all workers
app.get('/api/workers', async (req, res) => {
    try {
        const workers = await Worker.find();
        res.json(workers);
    } catch (err) {
        console.error('Error retrieving workers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update a worker's attendance
app.put('/api/workers/:id', async (req, res) => {
    const { id } = req.params;
    const { present } = req.body;

    try {
        const updatedWorker = await Worker.findByIdAndUpdate(id, { present }, { new: true });
        if (!updatedWorker) {
            return res.status(404).json({ error: 'Worker not found' });
        }
        res.json(updatedWorker);
    } catch (err) {
        console.error('Error updating worker:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete a worker
app.delete('/api/workers/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedWorker = await Worker.findByIdAndDelete(id);
        if (!deletedWorker) {
            return res.status(404).json({ error: 'Worker not found' });
        }
        res.json({ message: 'Worker deleted', worker: deletedWorker });
    } catch (err) {
        console.error('Error deleting worker:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all blasting logs
app.get('/api/blasting-logs', async (req, res) => {
    try {
        const logs = await BlastingLog.find();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new blasting log
app.post('/api/blasting-logs', async (req, res) => {
    const { date, location, quantity, type, remarks } = req.body;
    const newLog = new BlastingLog({ date, location, quantity, type, remarks });

    try {
        const savedLog = await newLog.save();
        res.status(201).json(savedLog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get a single blasting log by ID
app.get('/api/blasting-logs/:id', async (req, res) => {
    try {
        const log = await BlastingLog.findById(req.params.id);
        if (!log) return res.status(404).json({ message: 'Log not found' });
        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a blasting log by ID
app.put('/api/blasting-logs/:id', async (req, res) => {
    try {
        const updatedLog = await BlastingLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLog) return res.status(404).json({ message: 'Log not found' });
        res.status(200).json(updatedLog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a blasting log by ID
app.delete('/api/blasting-logs/:id', async (req, res) => {
    try {
        const deletedLog = await BlastingLog.findByIdAndDelete(req.params.id);
        if (!deletedLog) return res.status(404).json({ message: 'Log not found' });
        res.status(200).json({ message: 'Log deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all tools
app.get('/api/tools', async (req, res) => {
    try {
        const tools = await Tool.find();
        res.json(tools);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch tools.' });
    }
});

// Add a new tool
app.post('/api/tools', async (req, res) => {
    const { name, status, quantity, id, review } = req.body;
    try {
        const newTool = new Tool({ name, status, quantity, id, review });
        await newTool.save();
        res.status(201).json(newTool);
    } catch (err) {
        res.status(400).json({ message: 'Failed to add tool.' });
    }
});
// Add a new progress log
app.post('/api/progress-logs', async (req, res) => {
    const { date, siteLocation, quantityExtracted, rateOfProduction, creator, lastUpdated } = req.body;
    try {
        const newLog = new ProgressLog({ date, siteLocation, quantityExtracted, rateOfProduction, creator, lastUpdated });
        await newLog.save();
        res.status(201).json(newLog);
    } catch (err) {
        res.status(400).json({ message: 'Failed to add progress log.' });
    }
});

// Get all progress logs
app.get('/api/progress-logs', async (req, res) => {
    try {
        const logs = await ProgressLog.find();
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch progress logs.' });
    }
});

// // Get a single progress log by ID
// app.get('/api/progress-logs/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const log = await ProgressLog.findById(id);
//         if (log) {
//             res.status(200).json(log);
//         } else {
//             res.status(404).json({ message: 'Progress log not found.' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to fetch progress log.' });
//     }
// });
// GET endpoint to fetch all reports
app.get("/api/reports", async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reports" });
    }
});

// POST endpoint to create a new report
app.post("/api/reports", async (req, res) => {
    try {
        const newReport = new Report(req.body);
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(500).json({ error: "Failed to create report" });
    }
});

app.listen(1337, () => {
    console.log('Server started on port 1337');
});