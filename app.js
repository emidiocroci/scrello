
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var db = require('./model')
var TrelloAuth = require('./services/trelloAuth');
var trelloAuth = new TrelloAuth();
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
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

console.log(trelloAuth.passport);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/login', trelloAuth.passport.authenticate('trello'));
app.get('/cb', trelloAuth.passport.authenticate('trello', {
    successRedirect: '/success',
    failureRedirect: '/error'
}));
app.get('/success', function (req, res) {
    console.log('success');
});
app.get('/error', function (req, res) {
    cbonsole.log('error');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
