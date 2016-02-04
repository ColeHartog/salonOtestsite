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
    
})