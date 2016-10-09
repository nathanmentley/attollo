(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetBlocks = function (authContext, pageId){
		return this.Context.DatabaseContext.Blocks.forge()
				.query(function(query) {
					query.join('page', 'page.id', '=', 'block.pageid');
					query.join('site', 'site.id', '=', 'page.siteid');
					query.join('client', 'client.id', '=', 'site.clientid');
					query.where('client.id', '=', authContext.ClientID);
				})
				.query({
					where: {
						pageid: pageId
					}
				}).fetch();
	};
	
	classDef.prototype.AddBlock = function(authContext, block) {
		return this.Context.DatabaseContext.Block.forge().save(block);
	};
	
	module.exports = classDef;
})();