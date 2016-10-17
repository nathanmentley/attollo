(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetPages = function (authContext, siteId){
		return this.Context.DatabaseContext.Pages(authContext)
			.query({
				where: {
					siteid: siteId
				}
			}).fetch();
	};
	
	classDef.prototype.AddPage = function (authContext, siteId){
		var Page = this.Context.DatabaseContext.Page(authContext);
		var page = new Page({
			siteid: siteId,
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