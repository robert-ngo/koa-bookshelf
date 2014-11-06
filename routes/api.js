/*
 * API page, list all routes
 */
var parse = require('co-body');
var route = require('koa-route');

var render = require('../config/render');
var config = require('../config/config')();
var monk = require('monk');
var db = monk(config.mongoUrl);

var wrap = require('co-monk');
var Book = wrap(db.get('books'));

module.exports = function(app, route) {
  /**
   * Get all book
   * @type {[type]}
   */
  app.use(route.get('/api/book', function *() {
  	if('GET' != this.method) return yield next;
    this.body = yield Book.find({});
  }));

  /**
   * Get book by ID
   * @type {Array}
   */
  app.use(route.get('/api/book/:id', function*(id){
  	if('GET' != this.method) return yield next;
    this.body = yield Book.findById(id);
  }));

  /**
   * Handle creating new book
   * @type {String}
   */
  app.use(route.post('/api/book', function *() {
    if('POST' != this.method) return yield next;

    var defaultImage = "/images/default.png";
    this.body = this.req;
    //console.log(this.req);

 //    console.log(this.req);
 //    console.log(this.res);
     // var input = yield parse(this.req);
     // console.log(input);
	// var inserted = yield Book.insert({
	//     title: input.title, 
	//     year: input.year, 
	//     genre: input.genre.split(','), 
	//     plot: input.plot, 
	//     image: (input.image) ? input.image : defaultImage
	// });

 //    if(!inserted) {
 //        this.throw(405, "Unable to add new book.");
 //    }
    
 //    this.body = inserted;
  }));

  /**
   * Handle updateing book
   * @type {String}
   */
  app.use(route.put('/api/book/:id', function *(id) {
    if('PUT' != this.method) return yield next;

    var defaultImage = "/images/default.png";
    var input = yield parse(this);

	var updated = yield Book.updateById(input._id, {
        title: input.title, 
        year: input.year, 
        genre: input.genre.split(','), 
        plot: input.plot,
        image: (input.image) ? input.image : defaultImage
    }); 
    if(!updated) {
        this.throw(405, "Unable to update book %s", input.title);
    }
    
    this.body = updated;
  }));

  /**
   * Handle delete book
   * Need to invest more on securely delete book. Token ??
   */
  app.use(route.delete('/api/book/:id', function *(id) {
    if('DELETE' != this.method) return yield next;
    var removed = yield Book.remove({"_id": id});
    if(!removed) {
      this.throw(405, "Unable to delete book");
    }
    this.throw(200, "Delete book %s", id);
  }));

  /***********************************************************
   *  List out API routes
   ***********************************************************/
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