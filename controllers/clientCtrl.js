var clientModel = require('../models/clientModel');
var clientParams = ['firstname', 'lastname', 'email', 'phone', 'creationdate', 'appointments'];

module.exports = {
    
    create: function(req, res){
        var client = new clientModel(req.body);
        client.save(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    read: function(req, res){
        clientModel.find({}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    readpop: function(req, res){
        clientModel.find({}).populate({path: 'appointments', select: 'date -_id'}).exec(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    readid: function(req, res){
        console.log(req.params.id);
        clientModel.find({_id: req.params.id}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    readidpop: function(req, res){
        clientModel.find({_id: req.params.id}).populate({path: 'appointments', select: 'date -_id'}).exec(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    update: function(req, res){
        clientModel.findByIdAndUpdate(req.params.id, req.body, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    delete: function(req, res){
        clientModel.findByIdAndRemove(req.params.id, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    }
    
}