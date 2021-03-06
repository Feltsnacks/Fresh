  /**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    user = require('./api/user'),
    lists = require('./api/lists'),
    items = require('./api/items');
//    passport = require('passport'),
//    FacebookStrategy = require('passport-facebook').Strategy;

// Passport security setup
//var FACEBOOK_APP_ID = '463519200411932';
//var FACEBOOK_APP_SECRET = '1481f6153834938b3dccdfaeae884dea';

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
//passport.serializeUser(function(user, done) {
//  done(null, user);
//});

//passport.deserializeUser(function(obj, done) {
//  done(null, obj);
//});

//passport.use(new FacebookStrategy({
//    clientID: FACEBOOK_APP_ID,
//    clientSecret: FACEBOOK_APP_SECRET,
//    callbackURL: 'http://giftr.cloudapp.net:' + app.get('port') + '/auth/facebook/callback'
//  },
//  function(accessToken, refreshToken, profile, done) {
//    user.findOrCreate(accessToken, refreshToken, profile, function(err, loggedInUser) {
//      if (err) { return done(err); }
//      done(null, loggedInUser);
//    });
//  }
//));

// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
//passport.use(new FacebookStrategy({
//    clientID: FACEBOOK_APP_ID,
//    clientSecret: FACEBOOK_APP_SECRET,
//    callbackURL: "http://giftr.cloudapp.net:3000/auth/facebook/callback"
//  },
//  function(accessToken, refreshToken, profile, done) {
//    // asynchronous verification, for effect...
//    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
//      return done(null, profile);
//    });
//  }
//));

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
//app.use(passport.initialize());
//app.use(passport.session());
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

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
//app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
//app.get('/auth/facebook/callback', 
//  passport.authenticate('facebook', { successRedirect: '/',
//                                      failureRedirect: '#/login' }));

// API routes
app.get('/api/users', user.findAll);
app.post('/api/users/findorcreate', user.findOrCreate);
app.get('/api/users/:id', user.findById);
app.get('/api/users/:id/lists', lists.findByUser);
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

//function ensureAuthenticated(req, res, next) {
//  if (req.isAuthenticated()) { return next(); }
//  res.redirect('#/login')
//}