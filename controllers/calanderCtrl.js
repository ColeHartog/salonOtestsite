var appointmentModel = require('../models/appointmentModel'),
    dateFunc = require('./dateFunc');

module.exports = {
    
    todaysAppointments: function(req, res){
        var todayNum = dateFunc.getTodayStart();
        var endDayNum = dateFunc.getEndDay(todayNum);
        appointmentModel.find({$and: [{date: {$gt: todayNum}}, {date: {$lt: endDayNum}}]}).populate({path: 'stylist', select: 'firstname lastname -_id'}).populate({path: 'client', select: 'firstname lastname -_id'}).exec(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    dayAppointments: function(req, res){
        var todayNum = dateFunc.getDayStart(req.params.id);
        var endDayNum = dateFunc.getEndDay(req.params.id);
        appointmentModel.find({$and: [{date: {$gt: todayNum}}, {date: {$lt: endDayNum}}]}).populate({path: 'stylist', select: 'firstname lastname -_id'}).populate({path: 'client', select: 'firstname lastname -_id'}).exec(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    stylistAppointments: function(req, res){
        appointmentModel.find({stylist: req.params.id}).populate({path: 'stylist', select: 'firstname lastname -_id'}).populate({path: 'client', select: 'firstname lastname -_id'}).exec(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    stylistWeekAppointments: function(req, res){
        var dayStart = dateFunc.getTodayStart();
        var weekEnd = (dayStart+604800000);
        appointmentModel.find({$and: [{stylist: req.params.id}, {date: {$gt: dayStart}}, {date: {$lt: weekEnd}}]}).populate({path: 'stylist', select: 'firstname lastname -_id'}).populate({path: 'client', select: 'firstname lastname -_id'}).exec(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    }
    
};