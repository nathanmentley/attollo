(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	//BlockDef
	
	classDef.prototype.GetBlockDefs = function (authContext){
		return this.Context.DatabaseContext.BlockDefs(authContext).fetch();
	};

	classDef.prototype.GetBlockDef = function (authContext, code){
		return this.Context.DatabaseContext.BlockDefs(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};

	//Block

	classDef.prototype.GetBlocks = function (authContext, blockContainerId){
		return this.Context.DatabaseContext.Blocks(authContext)
			.query({
				where: {
					blockcontainerid: blockContainerId
				}
			}).fetch({ withRelated: ['BlockDef'] });
	};
	
	classDef.prototype.AddBlock = function (authContext, blockContainerId, blockDef, compiledtemplate){
		var Block = this.Context.DatabaseContext.Block(authContext);
		var block = new Block({
			blockdefid: blockDef.id,
			blockcontainerid: blockContainerId,
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

	//BlockContainerDef

	classDef.prototype.GetBlockContainerDefs = function (authContext){
		return this.Context.DatabaseContext.BlockContainerDefs(authContext).fetch();
	};

	//BlockContainer

	classDef.prototype.GetBlockContainers = function (authContext, pageId){
		return this.Context.DatabaseContext.BlockContainers(authContext)
			.query({
				where: {
					pageid: pageId
				}
			}).fetch({ withRelated: ['BlockContainerDef'] });
	};

	//BlockSettingDef

	classDef.prototype.GetBlockSettingDefs = function (authContext, blockDefId){
		return this.Context.DatabaseContext.BlockSettingDefs(authContext)
			.query({
				where: {
					blockdefid: blockDefId
				}
			}).fetch();
	};

	//BlockSettings

	classDef.prototype.GetBlockSettings = function (authContext, blockId){
		return this.Context.DatabaseContext.BlockSettings(authContext)
			.query({
				where: {
					blockid: blockId
				}
			}).fetch();
	};
	
	module.exports = classDef;
})();