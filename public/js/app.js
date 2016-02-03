angular.module('salonOApp', ['ui.router', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider){
    
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: './js/homePage/homeTmpl.html',
        controller: 'mainCtrl'
    })
    .state('about', {
        url: '/about',
        templateUrl: './js/aboutPage/aboutTmpl.html',
        controller: 'mainCtrl'
    })
    .state('reservation', {
        url: '/reservation',
        templateUrl: './js/reservations/reservationTmpl.html',
        controller: 'mainCtrl'
    })
    .state('services', {
        url: '/services',
        templateUrl: './js/servicesPage/serviceTmpl.html',
        controller: 'mainCtrl'
    })
    .state('team', {
        url: '/team',
        templateUrl: './js/teamPage/teamTmpl.html',
        controller: 'mainCtrl'
    })
    .state('product', {
        url: '/product',
        templateUrl: './js/products/productTmpl.html',
        controller: 'mainCtrl'
    })
    .state('contact', {
        url: '/contact',
        templateUrl: './js/contactPage/contactTmpl.html',
        controller: 'mainCtrl'
    })
    
    $urlRouterProvider.otherwise('/');
    
})