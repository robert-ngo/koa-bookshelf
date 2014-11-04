var parse = require('co-body'),
    db = require('../config/db'),
    wrap = require('co-monk'),
    Book = wrap(db.get('books'));
    //path = require('path'),
    //views = require('co-views'),
    //render = views(__dirname + './views', { map : {html : 'ejs'}});
var render = require('../config/render');

module.exports = function(app, route) {

  // ALL POSTS
  app.use(route.get('/api/books', function *() {
    var bookss = yield Book.find({});
    this.body = yield render('books.html', {'books': bookss});
  }));

  // FIND POST BY ID
  app.use(route.get('/api/book/:id', function *(id) {
    this.body = yield Book.find({id: id});
  }));

  // CREATE POST
  app.use(route.post('/api/book', function *(id) {
    var newBook = yield parse(this);
    newBook.created_on = new Date;
    newBook.updated_on = new Date;  
    this.body = yield Book.insert(newBook);
    if(this.body) this.status = 201;
  }));

  // UPDATE POST
  app.use(route.put('/api/book/:id', function *(id) {
    var updatedPost = yield parse(this);
    updatedPost.updated_on = new Date;
    this.body = yield Book.updateById(id, updatedPost);
  }));

  // DELETE POST
  app.use(route.del('/api/book/:id', function *(id) {
    yield Book.remove({"_id": id});
  }));

};