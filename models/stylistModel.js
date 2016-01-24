var mongoose = require('mongoose');

var stylistSchema = new mongoose.Schema({
    
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    pictureUrl: {type: String},
    services: [{type: String}],
    bio: {type: String},
    hours: {
        monday: {start: {type: Number}, end: {type: Number} },
        tuesday: {start: {type: Number}, end: {type: Number} },
        wednesday: {start: {type: Number}, end: {type: Number} },
        thursday: {start: {type: Number}, end: {type: Number} },
        friday: {start: {type: Number}, end: {type: Number} },
        saturday: {start: {type: Number}, end: {type: Number} },
        sunday: {start: {type: Number}, end: {type: Number} },
    }
    
});

module.exports = mongoose.model('Stylist', stylistSchema);