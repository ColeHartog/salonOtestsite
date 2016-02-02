angular.module('salonOApp')
.controller('mainCtrl', function($scope, mainService){
    
    $scope.test = 'scope test';
    
    $scope.products = mainService.getProducts();
    
    $scope.selected = $scope.products[0];
    
    $scope.selectProduct = function(index){
        $scope.selected = $scope.products[index];
    }
    
    $scope.services = mainService.getServices();
    
})