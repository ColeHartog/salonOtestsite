var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var local = require('passport-local');
var key = require('./config/key.js');

var userCtrl = require('./controllers/userCtrl');
var clientCtrl = require('./controllers/clientCtrl');
var stylistCtrl = require('./controllers/stylistCtrl');
var appointmentCtrl = require('./controllers/appointmentCtrl');
var productCtrl = require('./controllers/productCtrl');
var saleCtrl = require('./controllers/saleCtrl');
var reportCtrl = require('./controllers/reportCtrl');
var calanderCtrl = require('./controllers/calanderCtrl');

var app = express();

require('./config/passport.js')(passport);

app.use(session({
    secret: key,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var mongoUri = 'mongodb://localhost:27017/salono';
mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
    console.log('Connected to mongodb\n');
});


//app.post('/api/login',
//    passport.authenticate('local', {
//    
//    successRedirect: '/',
//    failureRedirect:'/asdf'
//}));




app.post('/api/login', passport.authenticate('local', {
    
    failureRedirect: false
}), function(req, res){
    res.send({login: true});
});

app.get('/api/logId', function(req, res, next){
    if(req.user){
        console.log(req.user._id);
        res.send('done bitch');
    }
    else {
        res.send('not loged in');
    }
})

//user api
app.post('/api/user', userCtrl.create);
app.get('/api/user', userCtrl.isAuth, userCtrl.read);
app.get('/api/user/:id', userCtrl.readid);
app.put('/api/user/:id', userCtrl.update);
app.delete('/api/user/:id', userCtrl.destroy);


//client api
app.post('/api/client', userCtrl.isAuth,  clientCtrl.create);
app.get('/api/client', userCtrl.isAuth,  clientCtrl.read);
app.get('/api/client/pop', userCtrl.isAuth,  clientCtrl.readpop);
app.get('/api/client/:id', userCtrl.isAuth,  clientCtrl.readid);
app.get('/api/client/pop/:id', userCtrl.isAuth,  clientCtrl.readidpop);
app.put('/api/client/:id', userCtrl.isAuth,  clientCtrl.update);
app.delete('/api/client/:id', userCtrl.isAuth,  clientCtrl.destroy);


// stylist api
app.post('/api/stylist', userCtrl.isAuth,  stylistCtrl.create);
app.get('/api/stylist', stylistCtrl.read);
app.get('/api/stylist/:id', stylistCtrl.readid);
app.put('/api/stylist/:id', userCtrl.isAuth,  stylistCtrl.update);
app.delete('/api/stylist/:id', userCtrl.isAuth,  stylistCtrl.destroy);


//appointment api
app.post('/api/appointment', userCtrl.isAuth,  appointmentCtrl.create);
app.get('/api/appointment', userCtrl.isAuth,  appointmentCtrl.read);
app.get('/api/appointment/pop', userCtrl.isAuth,  appointmentCtrl.readpop);
app.get('/api/appointment/:id', userCtrl.isAuth,  appointmentCtrl.readid);
app.get('/api/appointment/pop/:id', userCtrl.isAuth,  appointmentCtrl.readidpop);
app.get('/api/appointment/day/:id', userCtrl.isAuth,  appointmentCtrl.todaysAppointments);
app.put('/api/appointment/:id', userCtrl.isAuth,  appointmentCtrl.update);
app.delete('/api/appointment/:id', userCtrl.isAuth,  appointmentCtrl.destroy);


//product api
app.post('/api/product', userCtrl.isAuth,  productCtrl.create);
app.get('/api/product', userCtrl.isAuth,  productCtrl.read);
app.get('/api/product/:id', userCtrl.isAuth,  productCtrl.readid);
app.put('/api/product/:id', userCtrl.isAuth,  productCtrl.update);
app.delete('/api/product/:id', userCtrl.isAuth,  productCtrl.destroy);
app.put('/api/product/newOrder/:id', userCtrl.isAuth,  productCtrl.newOrder);


//sale api
app.post('/api/sale', userCtrl.isAuth,  saleCtrl.create);
app.get('/api/sale', userCtrl.isAuth,  saleCtrl.read);
app.get('/api/sale/pop', userCtrl.isAuth,  saleCtrl.readpop);
app.get('/api/sale/:id', userCtrl.isAuth,  saleCtrl.readid);
app.get('/api/sale/pop/:id', userCtrl.isAuth,  saleCtrl.readidpop);
app.put('/api/sale/:id', userCtrl.isAuth,  saleCtrl.update);
app.delete('/api/sale/:id', userCtrl.isAuth,  saleCtrl.destroy);


//report api
app.get('/api/report/newClients', userCtrl.isAuth,  reportCtrl.newClientsReport);
app.get('/api/report/newClientsRebooked', userCtrl.isAuth,  reportCtrl.newClientRebookedReport);
app.get('/api/report/salesToday', userCtrl.isAuth,  reportCtrl.salesTodayReport);
app.get('/api/report/salesDay/:id', userCtrl.isAuth,  reportCtrl.salesDayReport);
app.get('/api/report/salesThisMonth', userCtrl.isAuth,  reportCtrl.salesThisMonthReport);
app.get('/api/report/salesMonth/:id', userCtrl.isAuth,  reportCtrl.salesMonthReport);
app.get('/api/report/salesThisYear', userCtrl.isAuth,  reportCtrl.salesThisYearReport);
app.get('/api/report/salesYear/:id', userCtrl.isAuth,  reportCtrl.saleYearReport);


//calander api
app.get('/api/calander/todaysAppointments', userCtrl.isAuth,  calanderCtrl.todaysAppointments);
app.get('/api/calander/dayAppointments/:id', userCtrl.isAuth,  calanderCtrl.dayAppointments);
app.get('/api/calander/stylistAppointments/:id', userCtrl.isAuth,  calanderCtrl.stylistAppointments);
app.get('/api/calander/stylistWeekAppointments/:id', userCtrl.isAuth,  calanderCtrl.stylistWeekAppointments);





app.listen(3141, function(){
    console.log('\nListening to port 3141');
})