var express = require('express');
var http = require('http');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var ejs = require('ejs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var request = require('request');

//var favicon = require('serve-favicon');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser('my secret key'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'my secret key',
}));

if (app.get('env') === 'developer') {
    app.use(function(req, res, next) {
        res.status(err.status || 500);
        res.render('err', {
            message: err.message,
            error: err

        });
    });
}

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var index_router = require('./routers/index');

var member_router = require('./routers/member');

var channel_router = require('./routers/channel');

app.use('/', index_router);

app.use('/member/', member_router);

app.use('/channel/', channel_router);


var report = require('./lib/mailer/error_report');
app.use(function(req, res, next) {
    res.status(404);
    res.render('./pages/error/404');
    next();
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    var server_error = 'server error : ';
    server_error += err.stack;
    report.send_error(server_error, function(callback) {
        if (callback === false) {
            console.log('failed send report : ');
            console.log(server_error);
        } else {
            console.log('success send report  ');
        }
    });
    res.render('./pages/error/500');
});


module.exports = app;