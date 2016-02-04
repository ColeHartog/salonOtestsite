angular.module('salonOApp')
.controller('SRCtrl', function($scope, SRService){
    
    
    $scope.getUsers = function(){
        SRService.getUsers().then(function(response){
            console.log(response);
        })
    };
    
    $scope.selectedDay = new Date(Date.now()).toLocaleDateString();
    
    $('#appointmentsCalanderDiv').datepicker({
        defaultDate: 0,
        autoSize: true,
        onSelect: function(selected){
            $scope.selectedDay = selected;
            $scope.$apply();
        }
    });
    
    $scope.getTeam = function(){
        SRService.getTeam().then(function(response){
            $scope.team = response;
        })
    };
    
    $scope.getTeam();
    
})