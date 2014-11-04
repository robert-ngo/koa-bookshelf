"use strict";

var Wrap = require('co-monk');
var Db = require('./config/db');

var sampleData = require('./data/sample.data.json');
module.exports.resetDb = function() {

}

module.exports.populate = function () {	
	var Book = Wrap(Db.get('books'));
	Book.insert(sampleData);
}

