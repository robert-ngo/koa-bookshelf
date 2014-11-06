var BookLib_local = process.env.MONGOLAB_URI || "mongodb://localhost:27017/BookLib_local";
var BookLib_staging = process.env.MONGOLAB_URI || "mongodb://localhost:27017/BookLib_staging";
var BookLib_prod = process.env.MONGOLAB_URI || "mongodb://localhost:27017/BookLib_prod";


var config = {
	local: {
		mode: 'local', 
		port: 3000, 
		mongoUrl: BookLib_local
	},
	staging: {
		mode: 'staging', 
		port: 3005, 
		mongoUrl: BookLib_staging
	},
	prod: {
		mode: 'prod', 
		port: process.env.PORT || 3010, 
		mongoUrl: BookLib_prod
	},
}

module.exports = function (mode) {
  return config[mode || process.argv[2] || 'local'] || config.local;
};
