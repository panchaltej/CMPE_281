var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var index = require('./routes/index');
var login = require('./routes/login');
var signup = require('./routes/signup');
var user = require('./routes/user');

var superAdmin = require('./routes/SuperAdmin/superAdmin');
var addCommunity =require('./routes/SuperAdmin/addCommunity');
var remCommunity =require('./routes/SuperAdmin/remCommunity');
var remAdmin =require('./routes/SuperAdmin/remAdmin');
var adminLogin = require('./routes/Admin/adminLogin');
var addUser =require('./routes/Admin/addUser');
var remUser =require('./routes/Admin/remUser');
var listUsers =require('./routes/Admin/listUsers');
var addAdmin = require('./routes/SuperAdmin/addAdmin');
var message = require('./routes/messages');


var request = require('./routes/request');
var files = require('./routes/files');
var uploadFiles = require('./routes/uploadFiles');
var communities = require('./routes/communities');
var announcement = require('./routes/announcement');

// require('dotenv').config();



var app = express();

//Enable CORS
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/login', login);
app.use('/signup', signup);
app.use('/user', user);

app.use('/superAdmin', superAdmin);
app.use('/addCommunity',addCommunity);
app.use('/remCommunity',remCommunity);
app.use('/remAdmin',remAdmin);
app.use('/adminLogin',adminLogin);
app.use('/addUser',addUser);
app.use('/remUser',remUser);
app.use('/listUsers',listUsers);
app.use('/addAdmin', addAdmin);


app.use('/request', request);
app.use('/files', files);
app.use('/uploadFiles',uploadFiles);
app.use('/communities',communities);
app.use('/messages', message);
app.use('/announcement', announcement);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});


//
// // load aws sdk
// var aws = require('aws-sdk');
//
// // load aws config
// aws.config.loadFromPath('config.json');
//
// // load AWS SES
// var ses = new aws.SES();
//
// // send to list
// var to = ['jainul.patel11@gmail.com','tejas.panchal@sjsu.edu']
//
// // this must relate to a verified SES account
// var from = 'jainul.patel@sjsu.edu'
//
//
// // this sends the email
// // @todo - add HTML version
// ses.sendEmail( {
//     Source: from,
//     Destination: { ToAddresses: to },
//     Message: {
//         Subject: {
//     Data: 'Demo Announcement'
// },
// Body: {
//     Text: {
//         Data: 'Demo Announcement',
//     }
// }
// }
// }
// , function(err, data) {
//     if(err) throw err
//     console.log('Email sent:');
//     console.log(data);
// });


module.exports = app;