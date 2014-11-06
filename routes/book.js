'use strict';

var config = require('../config/config')();
var wrap = require('co-monk');
var monk = require('monk');
var db = monk(config.mongoUrl);

var parse = require('co-body');
var render = require('../config/render');

var Book = wrap(db.get('books'));

module.exports = function(app, route) {
  // ALL POSTS
  app.use(route.get('/', function *() {
    var books = yield Book.find({});
    this.body = yield render('book/books.html', {'books': books});
  }));

  // Render book add form
  app.use(route.get('/book/add', function*(){
    var years = []
    for(var i = 1980; i <= 2014; i++){
      years.push(i);
    }
    this.body = yield render('book/book-add.html', { "years": years });
  }));

  /**
   * Handle creating new book and update existing book
   * Method accepted: POST 
   * @type {String}
   */
  app.use(route.post('/book', function *() {
    if('POST' != this.method) return yield next;

    var defaultImage = "/images/default.png";
    var input = yield parse(this);

    // Without _id, create new book
    if(null === input._id) {
      var inserted = yield Book.insert({
        title: input.title, 
        year: input.year, 
        genre: input.genre.split(','), 
        plot: input.plot, 
        image: (input.image) ? input.image : defaultImage
      });

      if(!inserted) {
        this.throw(405, "Unable to add new book.");
      }
    }
    // else, update book with that _id
    else {
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
    }    
    
    this.redirect('/');
  }));


  /**
   * Render edit form
   * @type {Array}
   */
  app.use(route.get('/book/:id/edit', function*(id){
    if('GET' != this.method) return yield next;

    var years = []
    for(var i = 1980; i <= 2014; i++){
      years.push(i);
    }

    var book = yield Book.findById(id);
    if(null === book) {
      this.throw(404, "Book doesn't exist");
    }
    this.body = yield render('book/book-edit.html', { "years": years, "book": book });
  }));

  /**
   * Handle delete book
   * Need to invest more on securely delete book. Token ??
   */
  app.use(route.get('/book/:id/delete', function *(id) {
    if('GET' != this.method) return yield next;
    var removed = yield Book.remove({"_id": id});
    if(!removed) {
      this.throw(405, "Unable to delete book");
    }
    this.redirect('/');
  }));

};