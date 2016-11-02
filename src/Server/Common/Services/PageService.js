(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetPageDefs = function (authContext){
		return Context.Handlers.Page.GetPageDefs(authContext);
	};

	classDef.prototype.GetPageDef = function (authContext, code){
		return Context.Handlers.Page.GetPageDef(authContext, code);
	};
	
	classDef.prototype.AddPageDef = function (authContext, pageDef){
		return Context.Handlers.Page.AddPageDef(authContext, pageDef);
	};
	
	classDef.prototype.GetPages = function (authContext, siteVersionId){
		return Context.Handlers.Page.GetPages(authContext, siteVersionId);
	};
	
	classDef.prototype.AddPage = function (authContext, page){
		return Context.Handlers.Page.AddPage(authContext, page);
	};

	classDef.prototype.UpdatePage = function (authContext, model){
		return Context.Handlers.Page.UpdatePage(authContext, model);
	};

	classDef.prototype.DeletePage = function (authContext, model){
		return Context.Handlers.Page.DeletePage(authContext, model);
	};

	module.exports = classDef;
})();
