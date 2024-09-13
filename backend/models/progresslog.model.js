// ProgressLog Schema
const mongoose = require('mongoose')
const progressLogSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    siteLocation: { type: String, required: true },
    quantityExtracted: { type: Number, required: true },
    rateOfProduction: { type: Number, required: true },
    creator: String,
    lastUpdated: Date
});

const ProgressLog = mongoose.model('ProgressLog', progressLogSchema);
module.exports = ProgressLog