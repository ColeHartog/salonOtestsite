angular.module('salonOApp')
.controller('adminCtrl', function($scope, adminService, $state){
    
    $scope.input = {};
    
    $scope.signIn = function(data){
        adminService.login(data).then(function(response){
            console.log(response);
            if(response.login === true){
                $state.go('adminControl');
            }
        })
    };
    
    $scope.paramFinder = function(){
        return $state.current.url;
    }
    
})