(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetUsers = function (success, error){
		return this.Context.DatabaseContext.Users.forge().fetch()
				.then(success).catch(error);
	};
	
	classDef.prototype.AddUser = function(user, success, error) {
		return this.Context.DatabaseContext.User.forge().save(user)
				.then(success).catch(error);
	};
	
	module.exports = classDef;
})();