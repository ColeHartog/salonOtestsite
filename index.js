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


app.post('/api/login', passport.authenticate('local', {
    
    successRedirect: '/',
    failureRedirect:'/asdf'
}));


//user api
app.post('/api/user', userCtrl.create);
app.get('/api/user', userCtrl.read);
app.get('/api/user/:id', userCtrl.readid);
app.put('/api/user/:id', userCtrl.update);
app.delete('/api/user/:id', userCtrl.destroy);


//client api
app.post('/api/client', clientCtrl.create);
app.get('/api/client', clientCtrl.read);
app.get('/api/client/pop', clientCtrl.readpop);
app.get('/api/client/:id', clientCtrl.readid);
app.get('/api/client/pop/:id', clientCtrl.readidpop);
app.put('/api/client/:id', clientCtrl.update);
app.delete('/api/client/:id', clientCtrl.destroy);


// stylist api
app.post('/api/stylist', stylistCtrl.create);
app.get('/api/stylist', stylistCtrl.read);
app.get('/api/stylist/:id', stylistCtrl.readid);
app.put('/api/stylist/:id', stylistCtrl.update);
app.delete('/api/stylist/:id', stylistCtrl.destroy);


//appointment api
app.post('/api/appointment', appointmentCtrl.create);
app.get('/api/appointment', appointmentCtrl.read);
app.get('/api/appointment/pop', appointmentCtrl.readpop);
app.get('/api/appointment/:id', appointmentCtrl.readid);
app.get('/api/appointment/pop/:id', appointmentCtrl.readidpop);
app.put('/api/appointment/:id', appointmentCtrl.update);
app.delete('/api/appointment/:id', appointmentCtrl.destroy);


//product api
app.post('/api/product', productCtrl.create);
app.get('/api/product', productCtrl.read);
app.get('/api/product/:id', productCtrl.readid);
app.put('/api/product/:id', productCtrl.update);
app.delete('/api/product/:id', productCtrl.destroy);


//sale api
app.post('/api/sale', saleCtrl.create);
app.get('/api/sale', saleCtrl.read);
app.get('/api/sale/pop', saleCtrl.readpop);
app.get('/api/sale/:id', saleCtrl.readid);
app.get('/api/sale/pop/:id', saleCtrl.readidpop);
app.put('/api/sale/:id', saleCtrl.update);
app.delete('/api/sale/:id', saleCtrl.destroy);


//report api
app.get('/api/report/newClients', reportCtrl.newClientsReport);
app.get('/api/report/newClientsRebooked', reportCtrl.newClientRebookedReport);
app.get('/api/report/salesToday', reportCtrl.salesTodayReport);
app.get('/api/report/salesDay/:id', reportCtrl.salesDayReport);
app.get('/api/report/salesThisMonth', reportCtrl.salesThisMonthReport);
app.get('/api/report/salesMonth/:id', reportCtrl.salesMonthReport);
app.get('/api/report/salesThisYear', reportCtrl.salesThisYearReport);
app.get('/api/report/salesYear/:id', reportCtrl.saleYearReport);


//calander api
app.get('/api/calander/todaysAppointments', calanderCtrl.todaysAppointments);
app.get('/api/calander/dayAppointments/:id', calanderCtrl.dayAppointments);
app.get('/api/calander/stylistAppointments/:id', calanderCtrl.stylistAppointments);
app.get('/api/calander/stylistWeekAppointments/:id', calanderCtrl.stylistWeekAppointments);





app.listen(3141, function(){
    console.log('\nListening to port 3141');
})