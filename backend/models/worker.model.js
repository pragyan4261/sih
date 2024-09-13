// models/worker.model.js
const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    present: { type: Boolean, default: false },
}, { collection: 'worker-data' });

const Worker = mongoose.model('Worker', WorkerSchema);

module.exports = Worker;
