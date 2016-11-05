(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	//BlockDef
	
	classDef.prototype.GetBlockDefs = function (authContext, pageDefId){
		return this.Context.DatabaseContext.BlockDefs(authContext)
			.query((qb) => {
				qb.whereNull('pagedefid')
					.orWhere('pagedefid', '=', pageDefId);
			}).fetch();
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

	classDef.prototype.AddBlockDef = function (authContext, pageDefId, code, name){
		var BlockDef = this.Context.DatabaseContext.BlockDef(authContext);
		var blockDef = new BlockDef({
			pagedefid: pageDefId,
			code: code,
			name: name
		});

		return blockDef.save();
	};

	//blockTemplateDef

	classDef.prototype.GetBlockTemplateDef = function (authContext, blockDefId, templateCode) {
		return this.Context.DatabaseContext.BlockTemplateDefs(authContext)
				.query({
					where: {
						blockdefid: blockDefId,
						code: templateCode
					}
				})
				.fetch();
	};

	classDef.prototype.GetBlockTemplateDefs = function (authContext) {
		return this.Context.DatabaseContext.BlockTemplateDefs(authContext)
				.fetch();
	};

	classDef.prototype.AddBlockTemplateDef = function (authContext, blockDefId, code, name, template, compiledTemplate) {
		var BlockTemplateDef = this.Context.DatabaseContext.BlockTemplateDef(authContext);
		var blockTemplateDef = new BlockTemplateDef({
			blockdefid: blockDefId,
			code: code,
			name: name,
			template: template,
			compiledtemplate: compiledTemplate
		});

		return blockTemplateDef.save();
	};

	//Block
	classDef.prototype.GetBlocks = function (authContext, blockContainerId){
		return this.Context.DatabaseContext.Blocks(authContext)
			.query((qb) => {
				qb.where('blockcontainer.id', '=', blockContainerId);
			}).fetch({ withRelated: ['BlockDef', 'BlockContainerArea.BlockContainerAreaDef'] });
	};
	
	classDef.prototype.AddBlock = function (authContext, blockContainerArea, blockDef, blockTemplateDef){
		var Block = this.Context.DatabaseContext.Block(authContext);
		var block = new Block({
			blockdefid: blockDef.id,
			blockcontainerareaid: blockContainerArea.get('id'),
			title: blockDef.get('name'),
			blocktemplatedefid: blockTemplateDef.get('id')
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

	classDef.prototype.GetBlockContainerDef = function (authContext, code){
		return this.Context.DatabaseContext.BlockContainerDefs(authContext)
			.query((qb) => {
				qb.where('code', '=', code);
			}).fetch();
	};

	classDef.prototype.AddBlockContainerDef = function (authContext, code, title){
		var BlockContainerDef = this.Context.DatabaseContext.BlockContainerDef(authContext);
		var blockContainerDef = new BlockContainerDef({
			code: code,
			title: title
		});

		return blockContainerDef.save();
	};

	//BlockContainer

	classDef.prototype.GetBlockContainers = function (authContext, pageId){
		return this.Context.DatabaseContext.BlockContainers(authContext)
			.query((qb) => {
				qb.where('pageid', '=', pageId);
			}).fetch({ withRelated: [
				'BlockContainerDef',
				'BlockContainerAreas.Blocks',
				'BlockContainerAreas.Blocks.BlockSettings',
				'BlockContainerAreas.Blocks.BlockSettings.BlockSettingDef',
				'BlockContainerAreas.Blocks.BlockDef',
				'BlockContainerAreas.Blocks.BlockDef.BlockSettingDefs',
				'BlockContainerAreas.Blocks.BlockTemplateDef',
				'BlockContainerAreas.BlockContainerAreaDef'
			] });
	};

	classDef.prototype.AddBlockContainers = function (authContext, pageId, blockContainerDefId, displayOrder){
		var BlockContainer = this.Context.DatabaseContext.BlockContainer(authContext);
		var blockContainer = new BlockContainer({
			pageid: pageId,
			blockcontainerdefid: blockContainerDefId,
			displayorder: displayOrder
		});

		return blockContainer.save();
	};

	classDef.prototype.UpdateBlockContainer = function (authContext, model){
		var BlockContainer = this.Context.DatabaseContext.BlockContainer(authContext, true);
		var blockContainer = new BlockContainer(model);

		return blockContainer.save();
	};

	classDef.prototype.DeleteBlockContainer = function (authContext, blockContainer){
		return this.Context.DatabaseContext.BlockContainers(authContext)
			.query({
				where: {
					pageid: blockContainer.id
				}
			}).fetch({ withRelated: ['BlockContainerDef'] });
	};

	//BlockContainerAreaDef

	classDef.prototype.GetBlockContainerAreaDefs = function (authContext, blockContainerCode) {
		return this.Context.DatabaseContext.BlockContainerAreaDefs(authContext)
			.query((qb) => {
				qb.where('blockcontainerdef.code', '=', blockContainerCode);
				qb.innerJoin('blockcontainerdef', 'blockcontainerareadef.blockcontainerdefid', 'blockcontainerdef.id');
			}).fetch();
	};

	classDef.prototype.AddBlockContainerAreaDef = function (authContext, blockContainerDefID, code, title) {
		var BlockContainerAreaDef = this.Context.DatabaseContext.BlockContainerAreaDef(authContext);
		var blockContainerAreaDef = new BlockContainerAreaDef({
			blockcontainerdefid: blockContainerDefID,
			code: code,
			title: title
		});

		return blockContainerAreaDef.save();
	};

	//BlockContainerArea

	classDef.prototype.GetBlockContainerArea = function (authContext, blockContainerId, areaCode) {
		return this.Context.DatabaseContext.BlockContainerAreas(authContext)
			.query((qb) => {
				qb.where('blockcontainerid', '=', blockContainerId);
				qb.where('blockcontainerareadef.code', '=', areaCode);
				qb.innerJoin('blockcontainerareadef', 'blockcontainerarea.blockcontainerareadefid', 'blockcontainerareadef.id');
			}).fetch();
	};

	classDef.prototype.AddBlockContainerArea = function (authContext, blockContainerId, areaDefId) {
		var BlockContainerArea = this.Context.DatabaseContext.BlockContainerArea(authContext);
		var blockContainerArea = new BlockContainerArea({
			blockcontainerid: blockContainerId,
			blockcontainerareadefid: areaDefId
		});

		return blockContainerArea.save();
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

	classDef.prototype.AddBlockSettingDefs = function (authContext, blockDefId, code, title, defaultValue){
		var BlockSettingDef = this.Context.DatabaseContext.BlockSettingDef(authContext);
		var blockSettingDef = new BlockSettingDef({
			blockdefid: blockDefId,
			code: code,
			title: title,
			defaultvalue: defaultValue
		});

		return blockSettingDef.save();
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

	classDef.prototype.AddBlockSetting = function (authContext, blockId, blockSettingDefId, value) {
		var BlockSetting = this.Context.DatabaseContext.BlockSetting(authContext);
		var blockSetting = new BlockSetting({
			blockid: blockId,
			blocksettingdefid: blockSettingDefId,
			value: value
		});

		return blockSetting.save();
	};

	classDef.prototype.UpdateBlockSetting = function(authContext, model) {
		var BlockSetting = this.Context.DatabaseContext.BlockSetting(authContext);
		var blockSetting = new BlockSetting(model);

		return blockSetting.save();
	};
	
	module.exports = classDef;
})();