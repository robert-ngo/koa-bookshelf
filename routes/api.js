/*
 * API page, list all routes
 */

var parse = require('co-body');
var	route = require('koa-route');
var render = require('../config/render');

module.exports = function(app, route) {
  app.use(route.get('/api', function *() {
  	/* helper: to display routes on '/index.html' */
	route.routes = [];

	route.record = function(routeInfo){
	  route.routes.push(routeInfo);
	};

	route.record({ method: 'GET' , path: '/api/book' });
	route.record({ method: 'GET' , path: '/api/book/:id' });
	route.record({ method: 'POST' , path: '/api/book' });
	route.record({ method: 'PUT' , path: '/api/book/:id' });
	route.record({ method: 'DELETE' , path: '/api/book/:id' });
	/* helper */

    this.body = yield render('api.html', { "routes": route.routes });

  }));
}