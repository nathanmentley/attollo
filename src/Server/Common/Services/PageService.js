(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetPages = function (authContext, siteId){
		return Context.Handlers.Page.GetPages(authContext, siteId);
	};
	
	classDef.prototype.AddPage = function (authContext, siteId){
		return Context.Handlers.Page.AddPage(authContext, siteId);
	};

	classDef.prototype.UpdatePage = function (authContext, model){
		return Context.Handlers.Page.UpdatePage(authContext, model);
	};

	classDef.prototype.DeletePage = function (authContext, model){
		return Context.Handlers.Page.DeletePage(authContext, model);
	};

	module.exports = classDef;
})();
