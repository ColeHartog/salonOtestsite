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
    
    this.createAppointment = function(data){
        return $http({
            method: "POST",
            url: '/api/appointment',
            data: {
                date: Number(data.finalDate),
                stylist: data.stylist,
                client: data.clientID,
                duration: Number(data.duration)
            }
        }).then(function(response){
            return response;
        })
    };
    
    this.addNewClient = function(data){
        return $http({
            method: "POST",
            url: '/api/client',
            data: {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone
            }
        }).then(function(response){
            return response.data;
        })
    };
    
    this.deleteAppointment = function(id){
        return $http({
            method: "DELETE",
            url: '/api/appointment/'+id
        }).then(function(response){
            
        })
    };
    
})