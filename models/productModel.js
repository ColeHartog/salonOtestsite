var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    
    brand: {type: String, enum: ['Phyto', 'Kevin Murphy', 'Oribe', 'Davines', 'Other'], required:true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    
    lastoderrecieved: {date:{type: Number, default: Date.now}, amount: {type: Number}},
    instock: {type: Number},
    totalsold: {type: Number, default: 0}
});

module.exports = mongoose.model('Product', productSchema);