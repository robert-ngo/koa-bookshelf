'use strict';
var monk = require('monk'),
	wrap = require('co-monk');

var config = {
  "db": "BookLib",  
  "host": "localhost",  
  "user": "",
  "pw": "",
  "port": 27017
};

var port = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';
//var uristring =  process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||  "mongodb://" + login + config.host + port + "/" + config.db;
var herokuuri = "mongodb://heroku_app31294814:2odu3j8s2caj606i5dbju1b849@ds051160.mongolab.com:51160/heroku_app31294814";
module.exports = monk(herokuuri);
