// models/worker.model.js
const mongoose = require('mongoose');

// Tool Schema
const toolSchema = new mongoose.Schema({
    name: String,
    status: String,
    quantity: Number,
    id: String,
    review: String
},{collection: 'equipments-log'});

const Tool = mongoose.model('Tool', toolSchema);
module.exports = Tool;