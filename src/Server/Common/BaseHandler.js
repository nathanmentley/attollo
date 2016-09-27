(function () {
	var classDef = function (context) {
		this.Context = context;
	};
	
	classDef.prototype.Context = null;
	
	module.exports = classDef;
})();