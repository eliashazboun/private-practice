const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 255
    },
    date: {
        type: String,
        required: true,
        maxLength: 255,
    },
    start_time: {
        type: String,
        required: true,
        maxLength: 255
    },
    end_time: {
        type: String,
        required: true,
        maxLength: 255
    },
    client_id:{
        type: String,
        required: true,
        maxLength: 255
    },
    isPaid: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;