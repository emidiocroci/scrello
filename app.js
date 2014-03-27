"use strict";

/**
 * Module dependencies.
 */

/*globals require,process,__dirname*/

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var db = require('./model');
var TrelloAuth = require('./authStrategies/trelloAuth');
var trelloAuth = new TrelloAuth();
var authMiddleware = require('./middleware/authMiddleware');
var trello = require('./middleware/trello-middleware');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(trelloAuth.passport.initialize());
app.use(trelloAuth.passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/login', trelloAuth.passport.authenticate('trello'));
app.get('/cb', trelloAuth.passport.authenticate('trello', {
    successRedirect: '/success',
    failureRedirect: '/error'
}));
app.all('*', authMiddleware);
//trello proxy
app.all(/\/trello\/(.+)/, trello);
app.get('/', routes.index);

app.get('/success', function (req, res) {
    console.log('success');
    res.redirect('/');
});
app.get('/error', function (req, res) {
    console.log('error');
    res.send(500,'Error!')
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
