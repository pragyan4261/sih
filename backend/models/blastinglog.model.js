// models/BlastingLog.js
const mongoose = require('mongoose');

const BlastingLogSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    location: { type: String, required: true },
    quantity: { type: Number, required: true },
    type: { type: String, required: true },
    remarks: { type: String, required: false },
}, { timestamps: true }, {collection: 'blasting-log'});

module.exports = mongoose.model('BlastingLog', BlastingLogSchema);
