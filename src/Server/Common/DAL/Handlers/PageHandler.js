(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetPageDefs = function (authContext){
		return this.Context.DatabaseContext.PageDefs(authContext).fetch();
	};
	
	classDef.prototype.AddPageDef = function (authContext, model){
		var PageDef = this.Context.DatabaseContext.PageDef(authContext);
		var pageDef = new PageDef(model);

		return page.save();
	};
	
	classDef.prototype.GetPages = function (authContext, siteVersionId){
		return this.Context.DatabaseContext.Pages(authContext)
			.query({
				where: {
					siteversionid: siteVersionId
				}
			}).fetch();
	};
	
	classDef.prototype.AddPage = function (authContext, model){
		var Page = this.Context.DatabaseContext.Page(authContext);
		var page = new Page(model);

		return page.save();
	};
	
	classDef.prototype.UpdatePage = function (authContext, model){
		var Page = this.Context.DatabaseContext.Page(authContext, true);
		var page = new Page(model);

		return page.save();
	};
	
	classDef.prototype.DeletePage = function (authContext, model){
		var Page = this.Context.DatabaseContext.Page(authContext, true);
		var page = new Page(model);

		return page.destroy();
	};

	module.exports = classDef;
})();