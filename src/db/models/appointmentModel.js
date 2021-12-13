const mongoose = require("mongoose");
const {Schema} = mongoose;

const appointmentSchema = new Schema({
    namePatient: {type: String, required: true},
    nameDoctor: {type: String, required: true},
    date: {type: Date, required: true},
    textComplaints: {type: String},
});

module.exports = Appointment = mongoose.model('appointment', appointmentSchema);
