var mongoose = require('mongoose');

var saleSchema = new mongoose.Schema({
    
    date: {type: Date, default: Date.now},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true},
    stylist: {type: mongoose.Schema.Types.ObjectId, ref: 'Stylist', required: true},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    total: {type: Number, required: true}
    
});

module.exports = mongoose.model('Sale', saleSchema);