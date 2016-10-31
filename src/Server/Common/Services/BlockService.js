(function () {
	var jsx = require('react-jsx');

	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};

	//blockContainerDef

	classDef.prototype.GetBlockContainerDefs = function (authContext){
		return Context.Handlers.Block.GetBlockContainerDefs(authContext);
	};

	classDef.prototype.GetBlockContainerDef = function (authContext, code){
		return Context.Handlers.Block.GetBlockContainerDef(authContext, code);
	};

	//blockContainer

	classDef.prototype.GetBlockContainers = function (authContext, pageId){
		return Context.Handlers.Block.GetBlockContainers(authContext, pageId);
	};

	classDef.prototype.AddBlockContainers = function (authContext, pageId, code){
		var self = this;
		return new Promise(function(resolve, reject) {
			try{
				self.GetBlockContainers(authContext, pageId)
				.then((containers) => {
					var containersArray = containers.toJSON();
					var maxDisplayOrder = Math.max.apply(Math,containersArray.map(function(x){return x.displayorder;})) + 1;

					self.GetBlockContainerDef(authContext, code)
					.then(function(blockContainerDef) {
						Context.Handlers.Block.AddBlockContainers(authContext, pageId, blockContainerDef.first().get('id'), maxDisplayOrder)
						.then(function(blockContainer) {
							self.GetBlockContainerAreaDefs(authContext, code)
							.then((blockContainerAreaDefs) => {
								var areaDefs = blockContainerAreaDefs.toJSON();

								for(var i = 0; i < areaDefs.length; i++) {
									self.AddBlockContainerArea(authContext, blockContainer.get('id'), areaDefs[i]['id'])
									.then(() => {
										resolve();
									})
									.catch((err) => {
										reject({ message: err.message });
									});
								}
							})
							.catch((err) => {
								reject({ message: err.message });
							});
						}).catch(function(err) {
							reject({ message: site.get('id') + " " + err.message });
						});
					}).catch(function(err) {
						reject({ message: err.message });
					});
				}).catch((err) => {
					reject({ message: err.message });
				});
			} catch(e) {
				reject({ message: e.message });
			}
		});
	};

	classDef.prototype.UpdateBlockContainer = function (authContext, blockContainer){
		return Context.Handlers.Block.UpdateBlockContainer(authContext, blockContainer);
	};

	classDef.prototype.DeleteBlockContainer = function (authContext, blockContainer){
		return Context.Handlers.Block.DeleteBlockContainer(authContext, blockContainer);
	};
	
	//blockContainerAreaDef

	classDef.prototype.GetBlockContainerAreaDefs = function (authContext, containerCode) {
		return Context.Handlers.Block.GetBlockContainerAreaDefs(authContext, containerCode);
	};
	
	//blockContainerArea

	classDef.prototype.GetBlockContainerArea = function (authContext, blockContainerId, areaCode) {
		return Context.Handlers.Block.GetBlockContainerArea(authContext, blockContainerId, areaCode);
	};

	classDef.prototype.AddBlockContainerArea = function (authContext, blockContainerId, areaCode) {
		return Context.Handlers.Block.AddBlockContainerArea(authContext, blockContainerId, areaCode);
	};

	//blockDef

	classDef.prototype.GetBlockDefs = function (authContext){
		return Context.Handlers.Block.GetBlockDefs(authContext);
	};

	classDef.prototype.GetBlockDef = function (authContext, code) {
		return Context.Handlers.Block.GetBlockDef(authContext, code);
	};

	//blockTemplateDef

	classDef.prototype.GetBlockTemplateDef = function (authContext, blockDefId, templateCode) {
		return Context.Handlers.Block.GetBlockTemplateDef(authContext, blockDefId, templateCode);
	};

	//Block

	classDef.prototype.GetBlocks = function (authContext, blockContainerId){
		return Context.Handlers.Block.GetBlocks(authContext, blockContainerId);
	};
	
	classDef.prototype.AddBlock = function (authContext, blockContainerId, areaCode, blockDefCode, blockTemplateCode){
		var self = this;

		return new Promise(function(resolve, reject) {
			try{
				self.GetBlockContainerArea(authContext, blockContainerId, areaCode)
				.then((area) => {
					self.GetBlockDef(authContext, blockDefCode)
					.then((blockDef) => {
						self.GetBlockTemplateDef(authContext, blockDef.first().get('id'), blockTemplateCode)
						.then((blockTemplateDef) => {
							Context.Handlers.Block.AddBlock(authContext, area.first(), blockDef.first(), blockTemplateDef.first())
							.then(() => {
								resolve();
							})
							.catch((err) => {
								reject({ message: err.message });
							});
						})
						.catch((err) => {
							reject({ message: err.message });
						});
					}).catch((err) => {
						reject({ message: err.message });
					});
				}).catch((err) => {
					reject({ message: err.message });
				});
			} catch(e) {
				reject({ message: e.message });
			}
		});
	};

	classDef.prototype.UpdateBlock = function (authContext, block) {
		return Context.Handlers.Block.UpdateBlock(authContext, block);
	};

	classDef.prototype.DeleteBlock = function (authContext, block) {
		return Context.Handlers.Block.DeleteBlock(authContext, block);
	};
	
	//privateMethods
	var _renderTemplate = function(template) {
		//Todo: Make this shit not fucking hacky as shit.
		return jsx.client(template).toString()
				.replace("with (data)", "")
				.replace("this.props ? this : data", "data");
	};

	//BlockSettingDef

	classDef.prototype.GetBlockSettingDefs = function (authContext, blockDefId){
		return Context.Handlers.Block.GetBlockSettingDefs(authContext, blockDefId);
	};

	//BlockSetting

	classDef.prototype.GetBlockSettings = function (authContext, block){
		return Context.Handlers.Block.GetBlockSettings(authContext, block);
	};

	module.exports = classDef;
	
})();
