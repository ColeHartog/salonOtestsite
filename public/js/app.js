angular.module('salonOApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
    
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: './js/homePage/homeTmpl.html'
    })
    .state('about', {
        url: '/about',
        templateUrl: './js/aboutPage/aboutTmpl.html'
    })
    .state('reservation', {
        url: '/reservation',
        templateUrl: './js/reservations/reservationTmpl.html'
    })
    .state('services', {
        url: '/services',
        templateUrl: './js/servicesPage/serviceTmpl.html'
    })
    .state('team', {
        url: '/team',
        templateUrl: './js/teamPage/teamTmpl.html'
    })
    .state('product', {
        url: '/product',
        templateUrl: './js/products/productTmpl.html'
    })
    .state('contact', {
        url: '/contact',
        templateUrl: './js/contactPage/contactTmpl.html'
    })
    
    $urlRouterProvider.otherwise('/');
    
})