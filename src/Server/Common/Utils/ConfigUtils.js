(function () {
	var fs = require('fs');
	var path = require('path');

	var classDef = function () {};

	var obj = JSON.parse(fs.readFileSync(path.dirname(require.main.filename) + "/config.json", 'utf8'));

	classDef.prototype.GetConfig = function (){
		return obj;
	};
	
	module.exports = new classDef();
})();
