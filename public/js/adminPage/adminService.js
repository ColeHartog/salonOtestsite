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
    
})