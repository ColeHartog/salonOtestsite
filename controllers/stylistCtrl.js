var stylistModel = require('../models/stylistModel');
var mongoose = require('mongoose');

module.exports = {
    
    create: function(req, res){
        var stylist = new stylistModel(req.body);
        stylist.save(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    read: function(req, res){
        stylistModel.find({}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    readid: function(req, res){
        stylistModel.find({_id: req.params.id}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    update: function(req, res){
        stylistModel.findByIdAndUpdate(req.params.id, req.body, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    delete: function(req, res){
        stylistModel.findByIdAndRemove(req.params.id, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    }
    
}