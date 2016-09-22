(function () {
	var classDef = function () {};
	
    //Setup DB
	(function() {
		classDef.prototype.DatabaseContext = require("./DAL/Core/DBContext");
	})();
	
	module.exports = new classDef();
})();
