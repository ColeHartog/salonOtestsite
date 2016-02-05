var products = [
        {
            name: 'Oribe',
            imgUrl: '../images/products/oribe.png',
            desc: 'Straight from the runway, Oribe is our second line that has made its way from the fashion world to the salon. The beautiful packaging is just the beginning. Oribe was created for the client that wants luxury, while still enjoying the benefits of a color-safe, hydrating product line. One of the finest in hair care products, Oribe boasts long-lasting styles with minimal expertise needed.'
        },
        {
            name: 'Phytologie',
            imgUrl: '../images/products/phyto.png',
            desc: 'Phytologie is a comprehensive line that covers every haircare need from maintenance and treatment to color care and styling. Their mission is to use the most effective active ingredients to maintain a healthy scalp and sustain your hair’s natural beauty.'
        },
        {
            name: 'Davines',
            imgUrl: '../images/products/davines.png',
            desc: 'Davines focuses on crafting quality products that are scientifically created to work and express each individual’s style and spirit. This line enhances your look, while benefiting the health of your hair – the perfect combination of function and style.'
        },
        {
            name: 'Kevin Murphy',
            imgUrl: '../images/products/kevinmurphy.png',
            desc: 'Kevin Murphy is a fashion-focused product line originally created by Kevin Murphy to meet his needs as an editorial hair stylist. Murphy’s products provide performance, strength and longevity to support today’s ever-changing looks.'
        }
    ];

var services = [
    {
        name: 'Desgin & Shape',
        list: ['Women\'s Cuts', 'Men\'s Cuts', 'Shampoo / Blowdry', 'Blowdry Lesson', 'Hair Extensions']
    },
    {
        name: 'Pigment',
        list: ['Full Color', 'Retouch Color', 'Highlights', 'Ombre Color', 'Flamboyage', 'Color Glaze', 'Corrective Color']
    },
    {
        name: 'Remedy & Restore',
        list: ['Dry', 'Oily', 'Brittle / Fragile', 'Rebellious / Curly', 'Lifeless / Dull', 'Chemically Treated', 'Thinning Hair']
    },
    {
        name: 'Polish',
        list: ['Special Event Hair', 'Makeup Artist', 'Lash Extensions', ' Brow Wax', 'Brow and Lash Tinting']
    },
    {
        name: 'Texture',
        list: ['Keratin Smoothing Treatment', 'Relaxers', 'Perms']
    },
    {
        name: 'Indulge',
        list: ['Full Body Waxing & Sugaring', 'Full Face Waxing & Sugaring', 'Facials & Peels']
    }
]

angular.module('salonOApp')
.service('mainService', function($http){
    
    this.getProducts = function(){
        return products;
    };
    
    this.getServices = function(){
        return services;
    };
    
    this.getTeam = function(){
        return $http({
            method: "GET",
            url: "/api/stylist"
        }).then(function(response){
            return response.data;
        });
    };
    
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
    
    this.checkId = function(){
        return $http({
            method: 'GET',
            url: '/api/logId'
        }).then(function(response){
            return response.data;
        })
    };
    
})