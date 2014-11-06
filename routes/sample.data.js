"use strict";

var config = require('../config/config')();
var wrap = require('co-monk');
var monk = require('monk');
var db = monk(config.mongoUrl);

var parse = require('co-body');

var render = require('../config/render');
var sampleData = require('../data/sample.data.json');

module.exports = function(app, route) {
  /**
   * Render submit form
   * @type {[type]}
   */
  app.use(route.get('/populate-data', function *() {
    this.body = yield render('admin/populate-data.html', {"data": sampleData, "count": sampleData.length});
  }));

  /**
   * Handle form submit
   * @type {[type]}
   */
  app.use(route.post('/populate-data', function *() {
  	if('POST' != this.method) return yield next;

  	var input = yield parse(this);

  	if(input.reset) {
  		wrap(db.get('books')).remove();
  		console.log('Database reseted.');
  	}
  	if(input.importdb){
  		wrap(db.get('books')).insert(sampleData);
  		console.log('Sample data imported successfully (%d record(s)).', sampleData.length);
  	}
  	this.redirect('/');
  }));
}

