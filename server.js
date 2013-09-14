/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path'),
    user = require('./api/user'),
    lists = require('./api/lists'),
    items = require('./api/items');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
	res.sendfile('./public/index.html');
});

app.get('/api', function(req, res){
	res.sendfile('./api/index.html');
});

// API routes
app.get('/api/users', user.findAll);
app.get('/api/users/:id', user.findById);
app.post('/api/users', user.add);
app.put('/api/users/:id', user.update);
app.del('/api/users/:id', user.del);

app.get('/api/lists', lists.findAll);
app.get('/api/lists/:id', lists.findById);
app.post('/api/lists', lists.add);
app.put('/api/lists/:id', lists.update);
app.del('/api/lists/:id', lists.del);

app.get('/api/items', items.findAll);
app.get('/api/items/:id', items.findById);
app.post('/api/items', items.add);
app.put('/api/items/:id', items.update);
app.del('/api/items/:id', items.del);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
