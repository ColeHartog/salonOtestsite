var appointmentModel = require('../models/appointmentModel.js'),
    clientModel = require('../models/clientModel'),
    productModel = require('../models/productModel'),
    saleModel = require('../models/saleModel'),
    stylistModel = require('../models/stylistModel'),
    userModel = require('../models/userModel');


module.exports = {
    
    newClientsReport: function(req, res){
        var startDate = getTodayStart();
        clientModel.find({creationdate: {$gt: startDate}}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    newClientRebookedReport : function(req, res){
        var startDate = getTodayStart();
        clientModel.find({$and: [{creationdate: {$gt: startDate}}, {'appointments.1': {'$exists': true}}]}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    salesTodayReport: function(req, res){
        var startDate = getTodayStart();
        saleModel.find({date: {$gt: startDate}}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    salesDayReport: function(req, res){
        var startDate = getDayStart(req.params.id);
        var endDate = getEndDay(req.params.id);
        saleModel.find({$and: [{date: {$gt: startDate}}, {date: {$lt: endDate}}]}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    salesThisMonthReport: function(req, res){
        var startDate = getStartofThisMonth();
        saleModel.find({date: {$gt: startDate}}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    salesMonthReport: function(req, res){
        var startMonth = getStartofMonth(req.params.id);
        var endMonth = getEndofMonth(req.params.id);
        saleModel.find({$and: [{date: {$gt: startMonth}}, {date: {$lt: endMonth}}]}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    salesThisYearReport: function(req, res){
        var startYear = startofThisYear();
        saleModel.find({date: {$gt: startYear}}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    saleYearReport: function(req, res){
        var startYear = startofYear(req.params.id);
        var endYear = endofYear(req.params.id);
        saleModel.find({$and: [{date: {$gt: startYear}}, {date: {$lt: endYear}}]}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    }
    
};


var getTodayStart = function(){
    var dateArr = (new Date(Date.now())).toString().split(' ');
    dateArr.splice(4, 1, '00:00:00');
    var dateStartNum = Date.parse(dateArr.join(' '));
    return dateStartNum;
};

var getDayStart = function(day){
    var dateArr = (new Date(Number(day))).toString().split(' ');
    dateArr.splice(4, 1, '00:00:00');
    var dateStartNum = Date.parse(dateArr.join(' '));
    return dateStartNum;
};

var getEndDay = function(day){
    var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    var endDay = (new Date(Number(day))).toString().split(' ');
    var newDay = Number(endDay[2]) + 1;
    endDay.splice(4, 1, '00:00:00');
    endDay.splice(2, 1, newDay.toString());
    if(!(new Date(Date.parse(new Date(endDay.join(' ')))) > 1)){
        endDay.splice(2, 1, '01');
        var monthI = monthArr.indexOf(endDay[1]);
        if(monthI === 11){
            monthI = 0;
            endDay.splice(3, 1, (Number(endDay[3])+1).toString());
        }else{
            monthI ++;
        }
        endDay.splice(1, 1, monthArr[monthI]);
    }
    endDay = Date.parse(endDay.join(' '));
    return endDay;
};

var getStartofThisMonth = function(){
    var dateArr = (new Date(Date.now())).toString().split(' ');
    dateArr.splice(2, 1, '01');
    dateArr.splice(4, 1, '00:00:00');
    var dateStartNum = Date.parse(dateArr.join(' '));
    return dateStartNum;
};

var getStartofMonth = function(date){
    var monthStart = (new Date(Number(date))).toString().split(' ');
    monthStart.splice(4, 1, '00:00:00');
    monthStart.splice(2, 1, '01');
    monthStart = Date.parse(monthStart.join(' '));
    return monthStart;
};

var getEndofMonth = function(date){
    var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    var monthEnd = (new Date(Number(date))).toString().split(' ');
    monthEnd.splice(4, 1, '00:00:00');
    monthEnd.splice(2, 1, '01');
    var monthI = monthArr.indexOf(monthEnd[1]);
    if(monthI === 11){
        monthI = 0;
        monthEnd.splice(3, 1, (Number(monthEnd[3])+1).toString());
    }else{
        monthI ++;
    }
    monthEnd.splice(2, 1, monthArr[monthI]);
    monthEnd = Date.parse(monthEnd.join(' '));
    return monthEnd;
};

var startofThisYear = function(){
    var yearArr = (new Date(Date.now())).toString().split(' ');
    yearArr.splice(1, 4, 'Jan', '01', yearArr[3], '00:00:00');
    yearArr = Date.parse(yearArr.join(' '));
    return yearArr;
};

var startofYear = function(date){
    var yearArr = (new Date(Number(date))).toString().split(' ');
    yearArr.splice(1, 4, 'Jan', '01', yearArr[3], '00:00:00');
    yearArr = Date.parse(yearArr.join(' '));
    return yearArr;
};

var endofYear = function(date){
    var yearArr = (new Date(Number(date))).toString().split(' ');
    yearArr.splice(1, 4, 'Jan', '01', (Number(yearArr[3])+1).toString(), '00:00:00');
    yearArr = Date.parse(yearArr.join(' '));
    return yearArr;
};