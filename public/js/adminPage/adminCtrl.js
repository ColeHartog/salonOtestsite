angular.module('salonOApp')
.controller('adminCtrl', function($scope, adminService, $state){
    
    $scope.input = {};
    
    $scope.signIn = function(data){
        adminService.login(data).then(function(response){
            if(response.login === true){
                $state.go('adminControl');
            }
        })
    };
    
    $scope.paramFinder = function(){
        return $state.current.url;
    };
    
    $scope.getClients = function(){
        adminService.getClients().then(function(response){
            $scope.clients = response;
        })
    };
    
    $scope.getClients();
    
    $scope.getTeam = function(){
        adminService.getTeam().then(function(response){
            $scope.team = response;
        })
    };
    
    $scope.addNewClient = function(data){
        adminService.addNewClient(data).then(function(response){
            $scope.newC ={};
            $scope.getClients();
        })
    };
    
    $scope.getProducts = function(){
        adminService.getProducts().then(function(response){
            $scope.products = response;
        })
    };
    
    $scope.getProducts();
    
})