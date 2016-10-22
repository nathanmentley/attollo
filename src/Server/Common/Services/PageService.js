(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetPages = function (authContext, siteVersionId){
		return Context.Handlers.Page.GetPages(authContext, siteVersionId);
	};
	
	classDef.prototype.AddPage = function (authContext, siteVersionId){
		return Context.Handlers.Page.AddPage(authContext, siteVersionId);
	};

	classDef.prototype.UpdatePage = function (authContext, model){
		return Context.Handlers.Page.UpdatePage(authContext, model);
	};

	classDef.prototype.DeletePage = function (authContext, model){
		return Context.Handlers.Page.DeletePage(authContext, model);
	};

	module.exports = classDef;
})();
