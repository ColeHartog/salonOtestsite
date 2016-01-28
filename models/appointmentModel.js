var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
    
    date: {type: Number, required: true},
    stylist: {type: mongoose.Schema.Types.ObjectId, ref:'Stylist', required: true},
    client: {type: mongoose.Schema.Types.ObjectId, ref:'Client', required: true},
    service: {type: String, required: true},
    duration: {type: Number, required: true}

});

module.exports = mongoose.model('Appointment', appointmentSchema);