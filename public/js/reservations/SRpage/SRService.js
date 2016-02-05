angular.module('salonOApp')
.service('SRService', function($http){
    
    this.getTeam = function(){
        return $http({
            method: 'GET',
            url: '/api/stylist'
        }).then(function(response){
            return response.data;
        })
    };
    
    this.getDaysAppointments = function(date){
        var pdate = Date.parse(date);
        return $http({
            method: 'GET',
            url: '/api/appointment/day/' + pdate
        }).then(function(response){
            return response.data;
        })
    };
    
    this.getClients = function(){
        return $http({
            method: "GET",
            url: '/api/client/pop'
        }).then(function(response){
            return response.data
        })
    };
    
})