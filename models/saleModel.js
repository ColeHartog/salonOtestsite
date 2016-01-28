var mongoose = require('mongoose');

var saleSchema = new mongoose.Schema({
    
    date: {type: Number, default: Date.now},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true},
    stylist: {type: mongoose.Schema.Types.ObjectId, ref: 'Stylist', required: true},
    products: [{product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, amount: {type: Number, min: 0}}],
    total: {type: Number, required: true},
    soldby: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    
});

module.exports = mongoose.model('Sale', saleSchema);