(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetPages = function (authContext){
		return this.Context.DatabaseContext.Pages.forge()
			.query(function(query) {
				query.where('client.id', '=', authContext.ClientID);
			})
			.fetch({
				withRelated: [
					{
						Client: function(query) {
							query.where('client.id', '=', authContext.ClientID);
						}
					}
				]
			});
	};
	
	classDef.prototype.AddPage = function(authContext, page) {
		return this.Context.DatabaseContext.Page.forge().save(page);
	};
	
	module.exports = classDef;
})();