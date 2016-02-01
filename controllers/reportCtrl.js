var appointmentModel = require('../models/appointmentModel.js'),
    clientModel = require('../models/clientModel'),
    productModel = require('../models/productModel'),
    saleModel = require('../models/saleModel'),
    stylistModel = require('../models/stylistModel'),
    userModel = require('../models/userModel'),
    dateFunc = require('./dateFunc');


module.exports = {
    
    newClientsReport: function(req, res){
        var startDate = dateFunc.getTodayStart();
        clientModel.find({creationdate: {$gt: startDate}}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    newClientRebookedReport : function(req, res){
        var startDate = dateFunc.getTodayStart();
        clientModel.find({$and: [{creationdate: {$gt: startDate}}, {'appointments.1': {'$exists': true}}]}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    salesTodayReport: function(req, res){
        var startDate = dateFunc.getTodayStart();
        saleModel.find({date: {$gt: startDate}}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    salesDayReport: function(req, res){
        var startDate = dateFunc.getDayStart(req.params.id);
        var endDate = dateFunc.getEndDay(req.params.id);
        saleModel.find({$and: [{date: {$gt: startDate}}, {date: {$lt: endDate}}]}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    salesThisMonthReport: function(req, res){
        var startDate = dateFunc.getStartofThisMonth();
        saleModel.find({date: {$gt: startDate}}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    salesMonthReport: function(req, res){
        var startMonth = dateFunc.getStartofMonth(req.params.id);
        var endMonth = dateFunc.getEndofMonth(req.params.id);
        saleModel.find({$and: [{date: {$gt: startMonth}}, {date: {$lt: endMonth}}]}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    salesThisYearReport: function(req, res){
        var startYear = dateFunc.startofThisYear();
        saleModel.find({date: {$gt: startYear}}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    saleYearReport: function(req, res){
        var startYear = dateFunc.startofYear(req.params.id);
        var endYear = dateFunc.endofYear(req.params.id);
        saleModel.find({$and: [{date: {$gt: startYear}}, {date: {$lt: endYear}}]}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    }
    
};