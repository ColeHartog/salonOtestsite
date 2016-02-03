angular.module('salonOApp')
.controller('mainCtrl', function($scope, mainService){
    
    $scope.test = 'scope test';
    
    $scope.products = mainService.getProducts();
    
    $scope.selectProduct = function(index){
        $scope.selected = $scope.products[index];
    };
    
    $scope.services = mainService.getServices();
    
    $scope.selectService = function(index){
        $scope.selectedService = $scope.services[index];
    };
    
    $scope.formSend = function(){
        console.log($scope.Cinput);
        $scope.Cinput = {};
    }
    
    $scope.getTeam = function(){
        mainService.getTeam().then(function(response){
            $scope.team = response;
        })
    }
    
    $scope.getTeam();
    
    var movingStylistCurrent = false;
    
    $scope.moveStylistLeft = function(){
        
        if((($('.stylistDiv').last().offset()).left > ($('#stylistTeamDiv').offset()).left + ($('#stylistTeamDiv').width())) && movingStylistCurrent === false){
            movingStylistCurrent = true;
            $('.stylistDiv').animate({'left': '-=14.5%'}, 400, 'swing', function(){
                movingStylistCurrent = false;
            });
        }
        
    };
    
    $scope.moveStylistRight = function(){
        if(parseInt($('.stylistDiv').first().css('left')) < 0 && movingStylistCurrent === false){
            movingStylistCurrent = true;
            $('.stylistDiv').animate({'left': '+=14.5%'}, 400, 'swing', function(){
                movingStylistCurrent = false;
            });
        }
    };
    
    
    
    
    
    
    
    var servicedivSH = $('#ServicesDiv').innerHeight();
    
    $('#serviceNamesDiv').on('click', '.serviceNames', function(){
         
        var servicedivH = $('#ServicesDiv').innerHeight();
        $('#ServicesDiv').height(servicedivSH);
        console.log(servicedivSH, servicedivH);
        $('#ServicesDiv').animate({height: servicedivH}, 500, function(){
            servicedivSH = $('#ServicesDiv').height();
            $('#ServicesDiv').height('auto');
        });
        
    });
    
    var productDivSH = $('#ProductDiv').innerHeight();
    
    $('#productNamesDiv').on('click', '.productNames', function(){
         
        var productDivH = $('#ProductDiv').innerHeight();
        $('#ProductDiv').height(productDivSH);
        console.log(productDivSH, productDivH);
        $('#ProductDiv').animate({height: productDivH}, 500, function(){
            productDivSH = $('#ProductDiv').height();
            $('#ProductDiv').height('auto');
        });
        
    });
    
})