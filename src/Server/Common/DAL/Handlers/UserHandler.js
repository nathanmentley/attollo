(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetUsers = function (authContext){
		return this.Context.DatabaseContext.Users.forge().fetch();
	};

	classDef.prototype.GetUser = function (username, password) {
		return this.Context.DatabaseContext.Users.forge()
				.query({
					where: {
						name: username,
						password: password
					}
				})
				.fetchOne();
	};
	
	classDef.prototype.AddUser = function(authContext, user) {
		return this.Context.DatabaseContext.User.forge().save(user);
	};
	
	module.exports = classDef;
})();