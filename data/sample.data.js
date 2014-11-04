"use strict";

var wrap = require('co-monk');
var db = require('../config/db');

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

