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


//user api
app.post('/api/user', userCtrl.create);
app.get('/api/user', userCtrl.read);
app.get('/api/user/:id', userCtrl.readid);
app.put('/api/user/:id', userCtrl.update);
app.delete('/api/user/:id', userCtrl.delete);


//client api
app.post('/api/client', clientCtrl.create);
app.get('/api/client', clientCtrl.read);
app.get('/api/client/:id', clientCtrl.readid);
app.put('/api/client/:id', clientCtrl.update);
app.delete('/api/client/:id', clientCtrl.delete);


// stylist api
app.post('/api/stylist', stylistCtrl.create);
app.get('/api/stylist', stylistCtrl.read);
app.get('/api/stylist/:id', stylistCtrl.readid);
app.put('/api/stylist/:id', stylistCtrl.update);
app.delete('/api/stylist/:id', stylistCtrl.delete);


//appointment api
app.post('/api/appointment', appointmentCtrl.create);
app.get('/api/appointment', appointmentCtrl.read);
app.get('/api/appointment/:id', appointmentCtrl.readid);
app.put('/api/appointment/:id', appointmentCtrl.update);
app.delete('/api/appointment/:id', appointmentCtrl.delete);


//product api
app.post('/api/product', productCtrl.create);
app.get('/api/product', productCtrl.read);
app.get('/api/product/:id', productCtrl.readid);
app.put('/api/product/:id', productCtrl.update);
app.delete('/api/product/:id', productCtrl.delete);







app.listen(3141, function(){
    console.log('\nListening to port 3141');
})