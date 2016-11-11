(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetThemes = function (authContext){
		return Context.Handlers.Theme.GetThemes(authContext);
	};
	
	classDef.prototype.GetTheme = function (authContext, code){
		return Context.Handlers.Theme.GetTheme(authContext, code);
	};
	
	classDef.prototype.AddTheme = function (authContext, code, name){
		return Context.Handlers.Theme.AddTheme(authContext, code, name);
	};

	module.exports = classDef;
})();
