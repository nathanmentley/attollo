(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetUsers = function (authContext){
		return this.Context.DatabaseContext.Users(authContext).fetch();
	};

	classDef.prototype.GetUser = function (authContext, username, password) {
		return this.Context.DatabaseContext.NonFiltered.Users()
				.query({
					where: {
						name: username,
						password: password
					}
				})
				.fetchOne();
	};
	
	module.exports = classDef;
})();