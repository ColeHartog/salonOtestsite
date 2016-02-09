angular.module('salonOApp')
.controller('mainCtrl', function($scope, mainService, $state){
    
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
        $scope.Cinput = {};
    }
    
    $scope.getTeam = function(){
        mainService.getTeam().then(function(response){
            $scope.team = response;
        })
    }
    
    $scope.getTeam();
    
    $scope.stylistDirectiveDivShow = false;
    
    $scope.stylistDirectiveDivShowFuncShow = function(){
        $scope.stylistDirectiveDivShow = true;
    }
    
    $scope.stylistDirectiveDivShowFuncHide = function(){
        $scope.stylistDirectiveDivShow = false;
    }
    
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
    
    
    $scope.selectedStylist = {};
    
    $scope.selectStylist = function(data){
        $scope.selectedStylist = data;
        $scope.selectedStylistInfo = data.bio;
        $scope.selectedStylistType = 'Bio';
    }
    
    $scope.selectedStylistInfo = '';
    
    $scope.selectSylistInfo = function(data){
        $scope.selectedStylistInfo = data;
    }
    
    $scope.selectStylistType = function(data){
        $scope.selectedStylistType = data;
    }
    
    
    
    var servicedivSH = $('#ServicesDiv').innerHeight();
    
    $('#serviceNamesDiv').on('click', '.serviceNames', function(){
         
        var servicedivH = $('#ServicesDiv').innerHeight();
        $('#ServicesDiv').height(servicedivSH);
        $('#ServicesDiv').animate({height: servicedivH}, 500, function(){
            servicedivSH = $('#ServicesDiv').height();
            $('#ServicesDiv').height('auto');
        });
        
    });
    
    var productDivSH = $('#ProductDiv').innerHeight();
    
    $('#productNamesDiv').on('click', '.productNames', function(){
         
        var productDivH = $('#ProductDiv').innerHeight();
        $('#ProductDiv').height(productDivSH);
        $('#ProductDiv').animate({height: productDivH}, 500, function(){
            productDivSH = $('#ProductDiv').height();
            $('#ProductDiv').height('auto');
        });
        
    });
    
    $scope.login = function(data){
        mainService.login(data).then(function(response){
            if(response.login === true){
                $state.go('stylistR');
            }
        })
    };
    
    $scope.callTodayValue = false;
    
    $scope.CTS = function(){
        $scope.callTodayValue = !$scope.callTodayValue;
    }
    
})