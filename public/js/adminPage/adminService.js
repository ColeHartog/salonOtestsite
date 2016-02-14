angular.module('salonOApp')
.service('adminService', function($http){
    
    this.login = function(data){
        return $http({
            method: 'POST',
            url: '/api/login',
            data: {
                username: data.username,
                password: data.password
            }
        }).then(function(response){
            return response.data;
        })
    };
    
    this.getClients = function(){
        return $http({
            method: 'GET',
            url: '/api/client'
        }).then(function(response){
            return response.data;
        })
    };
    
    this.getTeam = function(){
        return $http({
            method: "GET",
            url: '/api/stylist'
        }).then(function(response){
            return response.data;
        })
    };
    
    this.addNewClient = function(data){
        return $http({
            method: "POST",
            url: '/api/client',
            data: {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone
            }
        }).then(function(response){
            return response.data;
        })
    };
    
    this.getProducts = function(){
        return $http({
            method: 'GET',
            url: '/api/product'
        }).then(function(response){
            return response.data;
        })
    };
    
    this.makeSale = function(data){
        return $http({
            method: 'POST',
            url: '/api/sale',
            data: {
                client: data.clientID,
                stylist: data.stylistID,
                products: data.products,
                total: data.total,
                paymentMethod: data.paymentMethod
            }
        }).then(function(response){
            return response.data;
        })
    };
    
    this.getDaySales = function(){
        return $http({
            method: 'GET',
            url: '/api/report/salesDay/'+Date.now(),
        }).then(function(response){
            return response.data;
        })
    };
    
    this.makeNewProduct = function(data){
        return $http({
            method: "POST",
            url: '/api/product',
            data: {
                brand: data.brand,
                name: data.name,
                price: data.price,
                instock: data.instock,
                totalsold: data.totalsold
            }
        }).then(function(response){
            return response;
        })
    };
    
    this.updateProduct = function(data){
        return $http({
            method: "PUT",
            url: '/api/product/'+data._id,
            data: {
                brand: data.brand,
                name: data.name,
                price: data.price,
                instock: data.instock,
                totalsold: data.totalsold
            }
        }).then(function(response){
            return response;
        })
    };
    
    this.newOrder = function(data, id){
        return $http({
            method: 'PUT',
            url: '/api/product/newOrder/' +id,
            data: {
                amount: data.amount,
                date: data.date
            }
        }).then(function(respose){
            return respose.data;
        })
    };
    
    this.getNewClients = function(){
        return $http({
            method: "GET",
            url: '/api/report/newClients'
        }).then(function(response){
            return response.data
        })
    };
    
    this.getRebookedClients = function(){
        return $http({
            method: "GET",
            url: '/api/report/newClientsRebooked'
        }).then(function(response){
            return response.data;
        })
    };
    
    this.getSalesDay = function(date){
        return $http({
            method: 'GET',
            url: '/api/report/salesDay/' + date,
        }).then(function(response){
            return response.data;
        })
    };
    
    this.getSalesMonth = function(date){
        return $http({
            method: "GET",
            url: '/api/report/salesMonth/'+date
        }).then(function(response){
            return response.data;
        })
    };
    
    this.getSalesYear = function(date){
        return $http({
            method: "GET",
            url: '/api/report/salesYear/'+date
        }).then(function(response){
            return response.data
        })
    };
    
})