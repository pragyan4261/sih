const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    quantity: Number,
    grade: String,
    carbonContent: Number,
    rate: Number,
    coalType: String,
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;