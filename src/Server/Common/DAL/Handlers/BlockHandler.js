(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetBlocks = function (authContext, pageId){
		return this.Context.DatabaseContext.Blocks(authContext)
			.query({
				where: {
					pageid: pageId
				}
			}).fetch({ withRelated: ['BlockDef'] });
	};
	
	classDef.prototype.AddBlock = function (authContext, pageId, blockDef, compiledtemplate){
		var Block = this.Context.DatabaseContext.Block(authContext);
		var block = new Block({
			blockdefid: blockDef.id,
			pageid: pageId,
			title: blockDef.get('name'),
			template: '<p>new ' + blockDef.get('name') + ' block</p>',
			compiledtemplate: compiledtemplate
		});

		return block.save();
	};
	
	classDef.prototype.UpdateBlock = function (authContext, model){
		var Block = this.Context.DatabaseContext.Block(authContext, true);
		var block = new Block(model);

		return block.save();
	};
	
	classDef.prototype.DeleteBlock = function (authContext, model){
		var Block = this.Context.DatabaseContext.Block(authContext, true);
		var block = new Block(model);

		return block.destroy();
	};
	
	module.exports = classDef;
})();