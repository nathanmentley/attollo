(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var Block = require('../Models/Block');

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
			}).fetch();
	};
	
	classDef.prototype.AddBlock = function (authContext, pageId, blockDef){
		var block = new Block({
			blockdefid: blockDef.id,
			pageid: pageId,
			title: blockDef.get('name'),
			template: '<p>new ' + blockDef.get('name') + ' block</p>'
		});

		return block.save();
	};
	
	classDef.prototype.UpdateBlock = function (authContext, block){
		var block = new Block(block);

		return block.save();
	};
	
	classDef.prototype.DeleteBlock = function (authContext, block){
		var block = new Block(block);

		return block.destroy();
	};
	
	module.exports = classDef;
})();