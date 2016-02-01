var productModel = require('../models/productModel');

module.exports = {
    
    create: function(req, res){
        var product = new productModel(req.body);
        product.save(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    read: function(req, res){
        productModel.find({}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    readid: function(req, res){
        productModel.find({_id: req.params.id}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    update: function(req, res){
        productModel.findByIdAndUpdate(req.params.id, req.body, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    destroy: function(req, res){
        productModel.findByIdAndRemove(req.params.id, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    }
    
}