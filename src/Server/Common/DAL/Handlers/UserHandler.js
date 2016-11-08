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

	classDef.prototype.GetUser = function (authContext, username) {
		return this.Context.DatabaseContext.Users(authContext, true)
				.query({
					where: {
						name: username
					}
				})
				.fetch();
	};
	
	classDef.prototype.AddUser = function (authContext, name, password){
		var User = this.Context.DatabaseContext.User(authContext);
		var user = new User({
			clientid: authContext.ClientID,
			name: name,
			password: password
		});

		return user.save();
	};
	
	classDef.prototype.UpdateUser = function (authContext, model){
		var User = this.Context.DatabaseContext.User(authContext);
		var user = new User(model);

		return user.save();
	};
	
	classDef.prototype.DeleteUser = function (authContext, userId){
		var User = this.Context.DatabaseContext.User(authContext);
		var user = new User({ id: userId });

		return user.destroy();
	};
	
	module.exports = classDef;
})();