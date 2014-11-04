var parse = require('co-body'),
    db = require('../config/db'),
    wrap = require('co-monk'),
    Book = wrap(db.get('books'));
    //path = require('path'),
    //views = require('co-views'),
    //render = views(__dirname + './views', { map : {html : 'ejs'}});
var render = require('../config/render');
var serve = require('koa-static');


module.exports = function(app, route) {
app.use(serve(__dirname + '/public'));
  // ALL POSTS
  app.use(route.get('/', function *() {
    var books = yield Book.find({});
    this.body = yield render('books.html', {'books': books});
  }));

  // FIND POST BY ID
  app.use(route.get('/api/book/:id', function *(id) {
    this.body = yield Book.find({_id: id});
  }));

  // CREATE BOOK FORM
  app.use(route.get('/book/add', function*(){
    var years = []
    for(var i = 1980; i <= 2014; i++){
      years.push(i);
    }
    this.body = yield render('book-add.html', { "years": years });
  }));

  // CREATE POST
  app.use(route.post('/api/book', function *() {
    var defaultImage = "/images/default.png";
    var newBook = yield parse(this);
    yield Book.insert({
      title: newBook.title, 
      year: newBook.year, 
      genre: newBook.genre.split(','), 
      plot: newBook.plot, 
      image: (newBook.image) ? newBook.image : defaultImage
    })
    
    this.redirect('/');
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