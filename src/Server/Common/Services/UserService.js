(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetUsers = function (success, error){
		return Context.Handlers.User.GetUsers(success, error);
	};
	
	classDef.prototype.AddUser = function (user, success, error){
		return Context.Handlers.User.AddUser(user, success, error);
	};
	
	module.exports = classDef;
})();
