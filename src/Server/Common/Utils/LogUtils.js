(function () {
	var fs = require('fs');
	var os = require("os");

	var LOGS_DIR = '/../../../../../logs/';

	var classDef = function () {};
	
	var AppName = null;

	var logIt = function(message) {
		var d = new Date();
		var finalMessage = d.toISOString() + ": " + message;

		console.log(finalMessage);
	
		if(AppName != null){
			var fileName = d.getFullYear() + '_' + (d.getMonth() + 1) + '_' + d.getDate() + '.log';
			var filePath = __dirname + LOGS_DIR + AppName + '/' + fileName;
		
			fs.appendFile(filePath, finalMessage + os.EOL, { flag: 'a+' }, function(err){});
		}
	};

	classDef.prototype.Init = function (appName) {
		AppName = appName;
	};

	classDef.prototype.Info = function (message){
		logIt(message);
	};
	classDef.prototype.Error = function (message){
		logIt("Error: " + message);
	};
	
	module.exports = new classDef();
})();
