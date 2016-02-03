angular.module('salonOApp')
.directive('stylistDir', function(){
    return{
        
        templateUrl: './js/teamPage/stylistTmpl.html',
        restrict: 'E',
        controller: 'mainCtrl'
        
    }
})