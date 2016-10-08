(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetPages = function (success, error){
		return Context.Handlers.Page.GetPages(success, error);
	};
	
	classDef.prototype.AddPage = function (page, success, error){
		return Context.Handlers.Page.AddPage(page, success, error);
	};
	
	module.exports = classDef;
})();
