angular.module('salonOApp')
.directive('addAppDir', function(){
    return{
        
        templateUrl: '/js/reservations/SRpage/addAppTmpl.html',
        restrict: 'E',
        controller: 'SRCtrl'
    }
})