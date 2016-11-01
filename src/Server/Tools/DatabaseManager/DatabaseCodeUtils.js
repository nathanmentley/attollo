(function () {
    var classDef = function () {};
    
	classDef.prototype.RunSqlCode = function (callback) {
        callback();
	};
	
	module.exports = new classDef();
})();