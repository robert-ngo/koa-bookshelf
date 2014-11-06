"use strict";

var config = require('../config/config')();
var wrap = require('co-monk');
var monk = require('monk');
var db = monk(config.mongoUrl);

var sampleData = require('./sample.data.json');

module.exports.countDb= function() {
	var Book = wrap(db.get('books'));
	return Book.count();
}
module.exports.resetDB = function() {
	var Book = wrap(db.get('books'));
	Book.remove();
}
module.exports.populateDb = function () {	
	var Book = wrap(db.get('books'));
	Book.insert(sampleData);
}

