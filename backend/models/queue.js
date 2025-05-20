const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        maxlength: 50
    },
    doctor: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    queueNumber: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Queue', queueSchema);
