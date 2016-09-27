(function () {

	var classDef = function () {};

	classDef.prototype.SendEmail = function (toAddr, fromAddr, subject, text, callback){
		callback();
	};
	
	module.exports = new classDef();
})();
