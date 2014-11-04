var parse = require('co-body'),
    db = require('../config/db'),
    wrap = require('co-monk'),
    Post = wrap(db.get('post'));

module.exports = function(app, route) {

  // ALL POSTS
  app.use(route.get('/api/posts', function *() {
    this.body = yield Post.find({});
  }));

  // FIND POST BY ID
  app.use(route.get('/api/post/:id', function *(id) {
    this.body = yield Post.find({id: id});
  }));

  // CREATE POST
  app.use(route.post('/api/post', function *(id) {
    var newPost = yield parse(this);
    newPost.created_on = new Date;
    newPost.updated_on = new Date;  
    this.body = yield Post.insert(newPost);
    if(this.body) this.status = 201;
  }));

  // UPDATE POST
  app.use(route.put('/api/post/:id', function *(id) {
    var updatedPost = yield parse(this);
    updatedPost.updated_on = new Date;
    this.body = yield Post.updateById(id, updatedPost);
  }));

  // DELETE POST
  app.use(route.del('/api/post/:id', function *(id) {
    yield Post.remove({"_id": id});
  }));

};