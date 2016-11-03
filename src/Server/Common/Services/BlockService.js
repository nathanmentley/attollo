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

	classDef.prototype.AddBlockContainerDef = function (authContext, code, title){
		return Context.Handlers.Block.AddBlockContainerDef(authContext, code, title);
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
					var maxDisplayOrder = 0;
					if(containersArray.length) {
						maxDisplayOrder = Math.max.apply(Math,containersArray.map(function(x){return x.displayorder;})) + 1;
					}

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

	classDef.prototype.AddBlockContainerAreaDef = function (authContext, blockContainerDefCode, code, title) {
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetBlockContainerDef(authContext, blockContainerDefCode)
			.then((blockContainerDef) => {
				Context.Handlers.Block.AddBlockContainerAreaDef(authContext, blockContainerDef.first().get('id'), code, title)
				.then((result) => {
					resolve(result);
				})
				.catch((err) => {
					reject(err);
				});
			})
			.catch((err) => {
				reject(err);
			});
		});
	};
	
	//blockContainerArea

	classDef.prototype.GetBlockContainerArea = function (authContext, blockContainerId, areaCode) {
		return Context.Handlers.Block.GetBlockContainerArea(authContext, blockContainerId, areaCode);
	};

	classDef.prototype.AddBlockContainerArea = function (authContext, blockContainerId, areaCode) {
		return Context.Handlers.Block.AddBlockContainerArea(authContext, blockContainerId, areaCode);
	};

	//blockDef

	classDef.prototype.GetBlockDefs = function (authContext, pageDefId){
		return Context.Handlers.Block.GetBlockDefs(authContext, pageDefId);
	};

	classDef.prototype.GetBlockDef = function (authContext, code) {
		return Context.Handlers.Block.GetBlockDef(authContext, code);
	};


	classDef.prototype.AddBlockDef = function (authContext, pageDefCode, code, name){
		var self = this;

		return new Promise((resolve, reject) => {
			if(pageDefCode) {
				Attollo.Services.Page.GetPageDef(authContext, pageDefCode)
				.then((pageDef) => {
					Context.Handlers.Block.AddBlockDef(authContext, pageDef.first().get('id'), code, name)
					.then((result) => {
						resolve(result);
					})
					.catch((err) => {
						reject(err);
					});
				})
				.catch((err) => {
					reject(err);
				});
			} else {
				Context.Handlers.Block.AddBlockDef(authContext, null, code, name)
				.then((result) => {
					resolve(result);
				})
				.catch((err) => {
					reject(err);
				});
			}
		});
	};

	//blockTemplateDef

	classDef.prototype.GetBlockTemplateDef = function (authContext, blockDefId, templateCode) {
		return Context.Handlers.Block.GetBlockTemplateDef(authContext, blockDefId, templateCode);
	};

	classDef.prototype.AddBlockTemplateDef = function (authContext, blockDefCode, code, name, template) {
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetBlockDef(authContext, blockDefCode)
			.then((blockDef) => {
				Context.Handlers.Block.AddBlockTemplateDef(
					authContext, blockDef.first().get('id'), code, name, template, _renderTemplate(template)
				).then((result) => {
					resolve(result);
				})
				.catch((err) => {
					reject(err);
				});
			})
			.catch((err) => {
				reject(err);
			});
		});
	};

	classDef.prototype.GetBlockTemplateDefs = function (authContext) {
		return Context.Handlers.Block.GetBlockTemplateDefs(authContext);
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

	classDef.prototype.AddBlockSettingDefs = function (authContext, blockDefCode, code, title, defaultValue){
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetBlockDef(authContext, blockDefCode)
			.then((blockDefs) => {
				Context.Handlers.Block.AddBlockSettingDefs(authContext, blockDefs.first().get('id'), code, title, defaultValue)
				.then((result) => {
					resolve(result);
				})
				.catch((err) => {
					reject(err);
				});
			})
			.catch((err) => {
				reject(err);
			});
		});
	};

	//BlockSetting

	classDef.prototype.GetBlockSettings = function (authContext, block){
		return Context.Handlers.Block.GetBlockSettings(authContext, block);
	};

	classDef.prototype.AddBlockSetting = function (authContext, blockId, blockSettingDefId, value){
		return Context.Handlers.Block.AddBlockSetting(authContext, blockId, blockSettingDefId, value);
	};

	module.exports = classDef;
	
})();
