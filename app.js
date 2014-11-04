'use strict';

// Requires
var koa = require('koa'),
    path = require('path'),
    fs = require('fs'),
    views = require('co-views'),
    serve = require('koa-static'),
    route = require('koa-route'),
    sessions = require('koa-session'),
    logger = require('koa-logger'),
    jsonp = require('koa-jsonp');

// populate Sample Data
// var sampleData = require('./sample.data.js');
// sampleData.populate();

// Initilize
var app = module.exports = koa(),
    //render = views(__dirname + '/views', { map : {html : 'ejs'}}),
    render = require('./config/render'),
    port = process.env.PORT || 9353,
    env = process.env.NODE_ENV || 'development'

app.keys = ['place-your-key-here'];

app.use(sessions());

if ('test' == env) {
    port = 9354;
}

app.use(logger());
app.use(jsonp());

// Routing

// static file serv
app.use(serve(__dirname + '/public'));

/* helper: to display routes on '/index.html' */
route.routes = [];

route.record = function(routeInfo){
  route.routes.push(routeInfo);
};

route.record({ method: 'GET' , path: '/' });
route.record({ method: 'GET' , path: '/api/posts' });
route.record({ method: 'GET' , path: '/api/post/:id' });
route.record({ method: 'POST' , path: '/api/post' });
route.record({ method: 'PUT' , path: '/api/post/:id' });
route.record({ method: 'DELETE' , path: '/api/post/:id' });

route.record({ method: 'GET' , path: '/api/books' });
route.record({ method: 'GET' , path: '/api/book/:id' });
route.record({ method: 'POST' , path: '/api/book' });
route.record({ method: 'PUT' , path: '/api/book/:id' });
route.record({ method: 'DELETE' , path: '/api/book/:id' });
/* helper */


app.use(route.get('/', function *() {
  this.body = yield render('index.html', {
    siteName: 'BookLib',
    /* helper: list of routes and methods */
    routes: route.routes
  });
}));

// Bootstrap routes/api
var routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(function(file) {
  if(file[0] === '.') return;
  require(routesPath + '/' + file)(app, route);
});

// handle error
app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

app.use(function *(){
    var err = new Error();
    err.status = 404;
    this.body  = yield render('404.html', { errors: err});
});

if (!module.parent) 
  app.listen(port);
  console.log('Listening on port:'+port+' in ' + env + ' mode.');
  console.log('Site can be viewed at: http://localhost:' + port);