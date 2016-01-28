var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
    
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String},
    phone: {type: Number},
    creationdate: {type: Number, default: Date.now},
    appointments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'}],
    
});

module.exports = mongoose.model('Client', clientSchema);