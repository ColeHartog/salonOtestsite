var appointmentModel = require('../models/appointmentModel');
var clientModel = require('../models/clientModel');

module.exports = {
    
    create: function(req, res){
        var appointment = new appointmentModel(req.body);
        var clientid = req.body.client;
        appointment.save(function(err, result){
            if(err){res.send(err)}
            else{
                
                clientModel.find({_id: clientid}, function(err1, result1){
                    var apparray = result1[0].appointments;
                    apparray.push(result._id);
                    
                    clientModel.findByIdAndUpdate({_id: clientid}, {appointments: apparray}, function(err2, result2){
                        
                    })
                    
                });
                
                res.send(result)
            }
        });
    },
    
    read: function(req, res){
        appointmentModel.find({}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    readpop: function(req, res){
        appointmentModel.find({}).populate({path: 'stylist', select: 'firstname lastname -_id'}).populate({path: 'client', select: 'firstname lastname -_id'}).exec(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    readid: function(req, res){
        appointmentModel.find({_id: req.params.id}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    readidpop: function(req, res){
        appointmentModel.find({_id: req.params.id}).populate({path: 'stylist', select: 'firstname lastname -_id'}).populate({path: 'client', select: 'firstname lastname -_id'}).exec(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    update: function(req, res){
        appointmentModel.findByIdAndUpdate(req.params.id, req.body, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    destroy: function(req, res){
        appointmentModel.findByIdAndRemove(req.params.id, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    }
    
}