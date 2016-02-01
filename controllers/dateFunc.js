module.exports = {
    
    getTodayStart : function(){
    var dateArr = (new Date(Date.now())).toString().split(' ');
    dateArr.splice(4, 1, '00:00:00');
    var dateStartNum = Date.parse(dateArr.join(' '));
    return dateStartNum;
},

    getDayStart : function(day){
    var dateArr = (new Date(Number(day))).toString().split(' ');
    dateArr.splice(4, 1, '00:00:00');
    var dateStartNum = Date.parse(dateArr.join(' '));
    return dateStartNum;
},

    getEndDay : function(day){
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
},
    
    getStartofThisMonth : function(){
    var dateArr = (new Date(Date.now())).toString().split(' ');
    dateArr.splice(2, 1, '01');
    dateArr.splice(4, 1, '00:00:00');
    var dateStartNum = Date.parse(dateArr.join(' '));
    return dateStartNum;
},

    getStartofMonth : function(date){
    var monthStart = (new Date(Number(date))).toString().split(' ');
    monthStart.splice(4, 1, '00:00:00');
    monthStart.splice(2, 1, '01');
    monthStart = Date.parse(monthStart.join(' '));
    return monthStart;
},

    getEndofMonth : function(date){
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
},

    startofThisYear : function(){
    var yearArr = (new Date(Date.now())).toString().split(' ');
    yearArr.splice(1, 4, 'Jan', '01', yearArr[3], '00:00:00');
    yearArr = Date.parse(yearArr.join(' '));
    return yearArr;
},

    startofYear : function(date){
    var yearArr = (new Date(Number(date))).toString().split(' ');
    yearArr.splice(1, 4, 'Jan', '01', yearArr[3], '00:00:00');
    yearArr = Date.parse(yearArr.join(' '));
    return yearArr;
},

    endofYear : function(date){
    var yearArr = (new Date(Number(date))).toString().split(' ');
    yearArr.splice(1, 4, 'Jan', '01', (Number(yearArr[3])+1).toString(), '00:00:00');
    yearArr = Date.parse(yearArr.join(' '));
    return yearArr;
}
    
}