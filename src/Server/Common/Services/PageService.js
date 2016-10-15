(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetPages = function (authContext, siteId){
		return Context.Handlers.Page.GetPages(authContext, siteId);
	};
	
	classDef.prototype.AddPage = function (authContext, page){
		return Context.Handlers.Page.AddPage(authContext, page);
	};
	
	module.exports = classDef;
})();
