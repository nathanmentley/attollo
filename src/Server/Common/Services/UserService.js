(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetUsers = function (authContext){
		return Context.Handlers.User.GetUsers(authContext);
	};
	
	classDef.prototype.GetUser = function (authContext, username, password){
		return Context.Handlers.User.GetUser(authContext, username, password);
	};
	
	module.exports = classDef;
})();
