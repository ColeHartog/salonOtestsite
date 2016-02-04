var userModel = require('../models/userModel');

module.exports = {
    
    create: function(req, res){
        var user = new userModel(req.body);
        user.save(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    read: function(req, res){
        userModel.find({}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    readid: function(req, res){
        userModel.find({_id: req.params.id}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    update: function(req, res){
        userModel.findByIdAndUpdate(req.params.id, req.body, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    destroy: function(req, res){
        userModel.findByIdAndRemove(req.params.id, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    isAuth: function(req, res, next){
        if(req.user){
            userModel.findById(req.user._id, function(err, result){
                if(err){res.send(err)}
                if(result){next()}
            })
        }else{
            res.send('not logged in')
        }
    }
    
    
}