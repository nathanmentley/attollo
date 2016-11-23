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

	classDef.prototype.GetPageDef = function (authContext, code){
		return this.Context.DatabaseContext.PageDefs(authContext)
			.query({
				where: {
					code: code
				}
			}).fetch();
	};
	
	classDef.prototype.AddPageDef = function (authContext, transaction, model){
		var PageDef = this.Context.DatabaseContext.PageDef(authContext);
		var pageDef = new PageDef(model);

		return pageDef.save(null, { transacting: transaction });
	};
	
	classDef.prototype.GetPages = function (authContext, siteVersionId){
		return this.Context.DatabaseContext.Pages(authContext)
			.query({
				where: {
					siteversionid: siteVersionId
				}
			}).fetch();
	};
	
	classDef.prototype.AddPage = function (authContext, transaction, model){
		var Page = this.Context.DatabaseContext.Page(authContext);
		var page = new Page(model);

		return page.save(null, { transacting: transaction });
	};
	
	classDef.prototype.UpdatePage = function (authContext, transaction, model){
		var Page = this.Context.DatabaseContext.Page(authContext);
		var page = new Page(model);

		return page.save(null, { transacting: transaction });
	};
	
	classDef.prototype.DeletePage = function (authContext, transaction, model){
		var Page = this.Context.DatabaseContext.Page(authContext);
		var page = new Page(model);

		return page.destroy({ transacting: transaction });
	};

	module.exports = classDef;
})();