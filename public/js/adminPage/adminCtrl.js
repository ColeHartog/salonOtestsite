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
    
    $scope.selectedProducts = [];
    
    $scope.filterProductSearch = function(product){
        var names = $scope.sale.productSelect.split(', ');
        if(product.name === names[0] && product.brand === names[1]){
            return product
        }else{
            return null
        }
    };
    
    $scope.addProductToSelected = function(){
        var selected = $scope.products.filter($scope.filterProductSearch)[0];
        $scope.selectedProducts.push({product: selected, amount: 1});
        $scope.sale.productSelect = '';
    };
    
    $scope.totalInCart = function(){
        var total = 0;
        for(var i = 0; i < $scope.selectedProducts.length; i++){
            total += ($scope.selectedProducts[i].amount * $scope.selectedProducts[i].product.price);
        }
        return total;
    };
    
    $scope.filterClientSearch = function(client){
        var names = $scope.sale.client.split(' ');
        if(client.firstname === names[0] && client.lastname === names[1]){
            return client
        }else{
            return null
        }
    };
    
    $scope.makeSale = function(data){
        var sale = {};
        sale.clientID = $scope.clients.filter($scope.filterClientSearch)[0]._id;
        sale.stylistID = data.stylist;
        sale.products = $scope.selectedProducts;
        sale.total = $scope.totalInCart();
        sale.paymentMethod = data.paymentMethod;
        
        adminService.makeSale(sale).then(function(response){
            $scope.sale = {};
            $scope.selectedProducts = [];
            $scope.getSales();
        })
    };
    
    $scope.getSales = function(){
        adminService.getDaySales().then(function(respnse){
            $scope.todaysSales = respnse;
        })
    };
    
    $scope.getSales();
    
    $scope.removeFromCart = function(index){
        $scope.selectedProducts.splice(index, 1);
    }
    
})