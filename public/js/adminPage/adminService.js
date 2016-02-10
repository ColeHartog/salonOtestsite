angular.module('salonOApp')
.service('adminService', function($http){
    
    this.login = function(data){
        return $http({
            method: 'POST',
            url: '/api/login',
            data: {
                username: data.username,
                password: data.password
            }
        }).then(function(response){
            return response.data;
        })
    };
    
    this.getClients = function(){
        return $http({
            method: 'GET',
            url: '/api/client'
        }).then(function(response){
            return response.data;
        })
    };
    
    this.getTeam = function(){
        return $http({
            method: "GET",
            url: '/api/stylist'
        }).then(function(response){
            return response.data;
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
    
    this.getProducts = function(){
        return $http({
            method: 'GET',
            url: '/api/product'
        }).then(function(response){
            return response.data;
        })
    };
    
})