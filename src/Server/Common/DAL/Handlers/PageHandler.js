(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetPages = function (authContext, siteVersionId){
		return this.Context.DatabaseContext.Pages(authContext)
			.query({
				where: {
					siteversionid: siteVersionId
				}
			}).fetch();
	};
	
	classDef.prototype.AddPage = function (authContext, siteVersionId){
		var Page = this.Context.DatabaseContext.Page(authContext);
		var page = new Page({
			siteversionid: siteVersionId,
			url: '/new-page',
			title: 'Title'
		});

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