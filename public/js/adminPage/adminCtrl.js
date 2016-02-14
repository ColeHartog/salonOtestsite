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
    };
    
    $scope.makeTimeReadable = function(dateNum){
        return new Date(dateNum).toLocaleTimeString();
    };
    
    $scope.selectedPProduct = {brand: 'Brand'};
    
    $scope.selectPProduct = function(data){
        $scope.selectedPProduct = data;
        console.log($scope.selectedPProduct);
    };
    
    $scope.clearSelectedPProduct = function(){
        $scope.selectedPProduct = {};
    };
    
    $scope.addorupdateProduct = function(data){
        if(data._id){
            adminService.updateProduct(data).then(function(response){
                $scope.clearSelectedPProduct();
                $scope.getProducts();
            })
        }else{
            adminService.makeNewProduct(data).then(function(response){
                $scope.clearSelectedPProduct();
                $scope.getProducts();
            })
        }
    };
    
    $scope.clearOrder = function(){
        $scope.order = {};
    };
    
    $scope.newOrder = function(data, id){
        if(id){
            adminService.newOrder(data, id).then(function(response){
                $scope.clearSelectedPProduct();
                $scope.clearOrder();
                $scope.getProducts();
            });
        }
    };
    
    $('#CRSRSCalander').datepicker({
        defaultDate: 0,
        onSelect: function(selected){
            $scope.selectedClientDay = Date.parse(new Date(selected));
            $scope.$apply();
        }
    });
    
    $('#SRSSSCalander').datepicker({
        defaultDate: 0,
        onSelect: function(selected){
            $scope.selectedReportDay = Date.parse(new Date(selected));
            $scope.$apply();
        }
    });
    
    $scope.getNewClients = function(){
        adminService.getNewClients().then(function(response){
            $scope.newClients = response;
        })
    };
    
    $scope.getNewClients();
    
    $scope.getRebookedClients = function(){
        adminService.getRebookedClients().then(function(response){
            $scope.rebookedClients = response;
        })
    };
    
    $scope.getRebookedClients();
    
    
    $scope.selectedReportDay = Date.now();
    
    $scope.getSalesDMY = function(dmy){
        if(dmy === 'day'){
            adminService.getSalesDay($scope.selectedReportDay).then(function(response){
                $scope.salesArray = response;
            });
        }else if(dmy === 'month'){
            adminService.getSalesMonth($scope.selectedReportDay).then(function(response){
                $scope.salesArray = response;
            })
        }else if(dmy === 'year'){
            adminService.getSalesYear($scope.selectedReportDay).then(function(response){
                $scope.salesArray = response;
            })
        }
    };
    
    $scope.getSalesDMY('day');
    
    $scope.totalSales = function(){
        var total = 0;
        for(var i = 0; i < $scope.salesArray.length; i++){
            total += $scope.salesArray[i].total;
        }
        return total;
    };
    
    $scope.totalOfProducts = function(data){
        var total = 0;
        for(var i = 0; i < data.length; i++){
            total += data[i].product.price * data[i].amount;
        }
        return total;
    };
    
})