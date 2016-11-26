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

	classDef.prototype.AddBlockDef = function (authContext, transaction, pluginDefId, pageDefId, code, name){
		var BlockDef = this.Context.DatabaseContext.BlockDef(authContext);
		var blockDef = new BlockDef({
			plugindefid: pluginDefId,
			pagedefid: pageDefId,
			code: code,
			name: name
		});

		return blockDef.save(null, { transacting: transaction });
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

	classDef.prototype.AddBlockTemplateDef = function (authContext, transaction, blockDefId, code, name, template, compiledTemplate) {
		var BlockTemplateDef = this.Context.DatabaseContext.BlockTemplateDef(authContext);
		var blockTemplateDef = new BlockTemplateDef({
			blockdefid: blockDefId,
			code: code,
			name: name,
			template: template,
			compiledtemplate: compiledTemplate
		});

		return blockTemplateDef.save(null, { transacting: transaction });
	};

	//Block
	classDef.prototype.GetBlocks = function (authContext, blockContainerId){
		return this.Context.DatabaseContext.Blocks(authContext)
			.query((qb) => {
				qb.where('blockcontainer.id', '=', blockContainerId);
			}).fetch({ withRelated: ['BlockDef', 'BlockContainerArea.BlockContainerAreaDef'] });
	};
	
	classDef.prototype.AddBlock = function (authContext, transaction, blockContainerArea, blockDef, blockTemplateDef){
		var Block = this.Context.DatabaseContext.Block(authContext);
		var block = new Block({
			blockdefid: blockDef.id,
			blockcontainerareaid: blockContainerArea.get('id'),
			title: blockDef.get('name'),
			blocktemplatedefid: blockTemplateDef.get('id')
		});

		return block.save(null, { transacting: transaction });
	};
	
	classDef.prototype.UpdateBlock = function (authContext, transaction, model){
		var Block = this.Context.DatabaseContext.Block(authContext);
		var block = new Block(model);

		return block.save(null, { transacting: transaction });
	};
	
	classDef.prototype.DeleteBlock = function (authContext, transaction, model){
		var Block = this.Context.DatabaseContext.Block(authContext);
		var block = new Block(model);

		return block.destroy({ transacting: transaction });
	};

	classDef.prototype.GetBlockCssRules = function (authContext) {
		return this.Context.DatabaseContext.BlockCssRules(authContext)
			.fetch({
				withRelated: [
					"CssRule",
					"CssRule.CssRuleDef"
				]
			});
	};

	classDef.prototype.GetBlockCssRulesForBlock = function (authContext, blockId) {
		return this.Context.DatabaseContext.BlockCssRules(authContext)
			.query((qb) => {
				qb.where('blockid', '=', blockId);
			}).fetch({
				withRelated: [
					"CssRule",
					"CssRule.CssRuleDef"
				]
			});
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

	classDef.prototype.AddBlockContainerDef = function (authContext, transaction, code, title){
		var BlockContainerDef = this.Context.DatabaseContext.BlockContainerDef(authContext);
		var blockContainerDef = new BlockContainerDef({
			code: code,
			title: title
		});

		return blockContainerDef.save(null, { transacting: transaction });
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
				'BlockContainerAreas.Blocks.BlockSettings.BlockSettingDef.SettingType',
				'BlockContainerAreas.Blocks.BlockDef',
				'BlockContainerAreas.Blocks.BlockDef.BlockSettingDefs',
				'BlockContainerAreas.Blocks.BlockDef.BlockSettingDefs.SettingType',
				'BlockContainerAreas.Blocks.BlockTemplateDef',
				'BlockContainerAreas.Blocks.BlockCssRules',
				'BlockContainerAreas.Blocks.BlockCssRules.CssRule',
				'BlockContainerAreas.Blocks.BlockCssRules.CssRule.CssRuleDef',
				'BlockContainerAreas.BlockContainerAreaDef'
			] });
	};

	classDef.prototype.AddBlockContainers = function (authContext, transaction, pageId, blockContainerDefId, displayOrder){
		var BlockContainer = this.Context.DatabaseContext.BlockContainer(authContext);
		var blockContainer = new BlockContainer({
			pageid: pageId,
			blockcontainerdefid: blockContainerDefId,
			displayorder: displayOrder
		});

		return blockContainer.save(null, { transacting: transaction });
	};

	classDef.prototype.UpdateBlockContainer = function (authContext, transaction, model){
		var BlockContainer = this.Context.DatabaseContext.BlockContainer(authContext);
		var blockContainer = new BlockContainer(model);

		return blockContainer.save(null, { transacting: transaction });
	};

	classDef.prototype.GetBlockContainerCssRules = function (authContext) {
		return this.Context.DatabaseContext.BlockContainerCssRules(authContext)
			.fetch({
				withRelated: [
					"CssRule",
					"CssRule.CssRuleDef"
				]
			});
	};

	//BlockContainerAreaDef

	classDef.prototype.GetBlockContainerAreaDefs = function (authContext, blockContainerCode) {
		return this.Context.DatabaseContext.BlockContainerAreaDefs(authContext)
			.query((qb) => {
				qb.where('blockcontainerdef.code', '=', blockContainerCode);
				qb.innerJoin('blockcontainerdef', 'blockcontainerareadef.blockcontainerdefid', 'blockcontainerdef.id');
			}).fetch();
	};

	classDef.prototype.AddBlockContainerAreaDef = function (authContext, transaction, blockContainerDefID, code, title) {
		var BlockContainerAreaDef = this.Context.DatabaseContext.BlockContainerAreaDef(authContext);
		var blockContainerAreaDef = new BlockContainerAreaDef({
			blockcontainerdefid: blockContainerDefID,
			code: code,
			title: title
		});

		return blockContainerAreaDef.save(null, { transacting: transaction });
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

	classDef.prototype.AddBlockContainerArea = function (authContext, transaction, blockContainerId, areaDefId) {
		var BlockContainerArea = this.Context.DatabaseContext.BlockContainerArea(authContext);
		var blockContainerArea = new BlockContainerArea({
			blockcontainerid: blockContainerId,
			blockcontainerareadefid: areaDefId
		});

		return blockContainerArea.save(null, { transacting: transaction });
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

	classDef.prototype.AddBlockSettingDefs = function (authContext, transaction, blockDefId, code, title, settingTypeId, defaultValue){
		var BlockSettingDef = this.Context.DatabaseContext.BlockSettingDef(authContext);
		var blockSettingDef = new BlockSettingDef({
			blockdefid: blockDefId,
			settingtypeid: settingTypeId,
			code: code,
			title: title,
			defaultvalue: defaultValue
		});

		return blockSettingDef.save(null, { transacting: transaction });
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

	classDef.prototype.AddBlockSetting = function (authContext, transaction, blockId, blockSettingDefId, value) {
		var BlockSetting = this.Context.DatabaseContext.BlockSetting(authContext);
		var blockSetting = new BlockSetting({
			blockid: blockId,
			blocksettingdefid: blockSettingDefId,
			value: value
		});

		return blockSetting.save(null, { transacting: transaction });
	};

	classDef.prototype.UpdateBlockSetting = function(authContext, transaction, model) {
		var BlockSetting = this.Context.DatabaseContext.BlockSetting(authContext);
		var blockSetting = new BlockSetting(model);

		return blockSetting.save(null, { transacting: transaction });
	};
	
	module.exports = classDef;
})();