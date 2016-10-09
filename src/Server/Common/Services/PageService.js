(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetPages = function (authContext){
		return Context.Handlers.Page.GetPages(authContext);
	};
	
	classDef.prototype.AddPage = function (authContext, page){
		return Context.Handlers.Page.AddPage(authContext, page);
	};
	
	module.exports = classDef;
})();
