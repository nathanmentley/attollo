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
	
	classDef.prototype.AddUser = function (authContext){
		return Context.Handlers.User.AddUser(authContext);
	};
	
	classDef.prototype.UpdateUser = function (authContext, user){
		return Context.Handlers.User.UpdateUser(authContext, user);
	};
	
	classDef.prototype.DeleteUser = function (authContext, userId){
		return Context.Handlers.User.DeleteUser(authContext, userId);
	};
	
	module.exports = classDef;
})();
