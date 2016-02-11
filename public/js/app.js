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
    .state('stylistR', {
        url: '/appointments',
        templateUrl: './js/reservations/SRpage/SRTmpl.html',
        controller: 'SRCtrl'
    })
    .state('adminLogin', {
        url: '/adminLogin',
        templateUrl: './js/adminPage/ALTmpl.html',
        controller: 'adminCtrl'
    })
    .state('adminControl', {
        url: '/adminControl',
        templateUrl: './js/adminpage/adminTmpl.html',
        controller: 'adminCtrl'
    })
    .state('adminSales', {
        parent: 'adminControl',
        url: '/Sales',
        templateUrl: './js/adminPage/views/APSalesTmpl.html',
        controller: 'adminCtrl'
    })
    .state('adminReports', {
        parent: 'adminControl',
        url: '/Reports',
        templateUrl: './js/adminPage/views/APReportsTmpl.html',
        controller: 'adminCtrl'
    })
    .state('adminProducts', {
        parent: 'adminControl',
        url: '/Products',
        templateUrl: './js/adminPage/views/APProductsTmpl.html',
        controller: 'adminCtrl'
    })
    
    $urlRouterProvider.otherwise('/');
    
})