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
		return Context.DBTransaction((transaction) => {
            Context.Handlers.Block.AddBlockContainerDef(authContext, transaction, code, title)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//blockContainer

	classDef.prototype.GetBlockContainers = function (authContext, pageId){
		return Context.Handlers.Block.GetBlockContainers(authContext, pageId);
	};

	classDef.prototype.AddBlockContainers = function (authContext, pageId, code){
		var self = this;
		return new Promise((resolve, reject) => {
			try{
				self.GetBlockContainers(authContext, pageId)
				.then((containers) => {
					var containersArray = containers.toJSON();
					var maxDisplayOrder = 0;
					if(containersArray.length) {
						maxDisplayOrder = Math.max.apply(Math,containersArray.map(function(x){return x.displayorder;})) + 1;
					}

					self.GetBlockContainerDef(authContext, code)
					.then((blockContainerDef) => {
						Context.DBTransaction((transaction) => {
							Context.Handlers.Block.AddBlockContainers(authContext, transaction, pageId, blockContainerDef.first().get('id'), maxDisplayOrder)
							.then((blockContainer) => {
								self.GetBlockContainerAreaDefs(authContext, code)
								.then((blockContainerAreaDefs) => {
									var areaDefs = blockContainerAreaDefs.toJSON();
									var promises = [];

									for(var i = 0; i < areaDefs.length; i++) {
										promises.push(
											Context.Handlers.Block.AddBlockContainerArea(authContext, transaction, blockContainer.get('id'), areaDefs[i]['id'])
										);
									}

									Promise.all(promises)
									.then((result) => {
										transaction.commit(result);
									})
									.catch((err) => {
										transaction.rollback(err);
									});
								})
								.catch((err) => {
									transaction.rollback(err);
								});
							}).catch((err) => {
								transaction.rollback(err);
							});
						})
						.then((result) => {
							resolve(result);
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

	classDef.prototype.UpdateBlockContainer = function (authContext, blockContainer){
		return Context.DBTransaction((transaction) => {
            Context.Handlers.Block.UpdateBlockContainer(authContext, transaction, blockContainer)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
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
				Context.DBTransaction((transaction) => {
                    Context.Handlers.Block.AddBlockContainerAreaDef(authContext, transaction, blockContainerDef.first().get('id'), code, title)
                    .then((result) => {
                        transaction.commit(result);
                    }).catch((err) => {
                        transaction.rollback(err);
                    });
                })
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

	//blockDef

	classDef.prototype.GetBlockDefs = function (authContext, pageDefId){
		return Context.Handlers.Block.GetBlockDefs(authContext, pageDefId);
	};

	classDef.prototype.GetBlockDef = function (authContext, code) {
		return Context.Handlers.Block.GetBlockDef(authContext, code);
	};


	classDef.prototype.AddBlockDef = function (authContext, pluginDefCode, pageDefCode, code, name){
		var self = this;

		return new Promise((resolve, reject) => {
			Attollo.Services.Plugin.GetPluginDef(authContext, pluginDefCode)
			.then((pluginDef) => {
				if(pageDefCode) {
					Attollo.Services.Page.GetPageDef(authContext, pageDefCode)
					.then((pageDef) => {
						Context.DBTransaction((transaction) => {
							Context.Handlers.Block.AddBlockDef(authContext, transaction, pluginDef.first().get('id'), pageDef.first().get('id'), code, name)
							.then((result) => {
								transaction.commit(result);
							}).catch((err) => {
								transaction.rollback(err);
							});
						})
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
					Context.DBTransaction((transaction) => {
						Context.Handlers.Block.AddBlockDef(authContext, transaction, pluginDef.first().get('id'), null, code, name)
						.then((result) => {
							transaction.commit(result);
						}).catch((err) => {
							transaction.rollback(err);
						});
					})
					.then((result) => {
						resolve(result);
					})
					.catch((err) => {
						reject(err);
					});
				}
			})
			.catch((err) => {
				reject(err);
			});
		});
	};

	//BlockDefFunctions

	classDef.prototype.AddBlockDefFunction = function (authContext, blockDefCode, model){
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetBlockDef(authContext, blockDefCode)
			.then((blockDef) => {
				model.compiledcontent = model.content;
				model.blockdefid = blockDef.first().get('id');

				Context.DBTransaction((transaction) => {
					Context.Handlers.Block.AddBlockDefFunction(authContext, transaction, model)
					.then((result) => {
						transaction.commit(result);
					}).catch((err) => {
						transaction.rollback(err);
					});
				})
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

	//BlockDefDataRequest

	classDef.prototype.AddBlockDefDataRequest = function (authContext, blockDefCode, model){
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetBlockDef(authContext, blockDefCode)
			.then((blockDef) => {
				model.blockdefid = blockDef.first().get('id');

				Context.DBTransaction((transaction) => {
					Context.Handlers.Block.AddBlockDefDataRequest(authContext, transaction, model)
					.then((result) => {
						transaction.commit(result);
					}).catch((err) => {
						transaction.rollback(err);
					});
				})
				.then((result) => { 
					resolve(result); 
				})
				.catch((err) => { 
					reject(err); 
				});
			})
			.cathc((err) => {
				reject(err);
			});
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
				Context.DBTransaction((transaction) => {
					Context.Handlers.Block.AddBlockTemplateDef(
						authContext, transaction, blockDef.first().get('id'), code, name, template, _renderTemplate(template)
					)
					.then((result) => {
						transaction.commit(result);
					}).catch((err) => {
						transaction.rollback(err);
					});
				})
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
							Context.DBTransaction((transaction) => {
								Context.Handlers.Block.AddBlock(authContext, transaction, area.first(), blockDef.first(), blockTemplateDef.first())
								.then((result) => {
									transaction.commit(result);
								}).catch((err) => {
									transaction.rollback(err);
								});
							})
							.then(() => {
								resolve();
							})
							.catch((err) => {
								reject({ stack: err.stack, message: err.message });
							});
						})
						.catch((err) => {
							reject({ stack: err.stack, message: err.message });
						});
					}).catch((err) => {
						reject({ stack: err.stack, message: err.message });
					});
				}).catch((err) => {
					reject({ stack: err.stack, message: err.message });
				});
			} catch(e) {
				reject({ message: e.message });
			}
		});
	};

	classDef.prototype.UpdateBlock = function (authContext, block) {
		var self = this;

		return new Promise((resolve, reject) => {
			Context.DBTransaction((transaction) => {
				Context.Handlers.Block.UpdateBlock(authContext, transaction, block)
				.then((result) => {
					if(block.BlockSettings.length > 0) {
						var promises = [];

						block.BlockSettings.map((x) => {
							promises.push(Context.Handlers.Block.UpdateBlockSetting(authContext, transaction, x));
						});

						Promise.all(promises)
						.then(() => {
							transaction.commit(result);
						})
						.catch((err) => {
							transaction.rollback(err);
						});
					} else {
						transaction.commit(result);
					}
				}).catch((err) => {
					transaction.rollback(err);
				});
			})
			.then((result) => {
				resolve(result);
			}).catch((err) => {
				reject({ message: err.message });
			});
		});
	};

	classDef.prototype.DeleteBlock = function (authContext, block) {
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Block.DeleteBlock(authContext, transaction, block)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
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

	classDef.prototype.AddBlockSettingDefs = function (authContext, blockDefCode, code, title, settingTypeCode, defaultValue){
		var self = this;

		return new Promise((resolve, reject) => {
			Attollo.Services.Setting.GetSettingType(authContext, settingTypeCode)
			.then((settingType) => {
				self.GetBlockDef(authContext, blockDefCode)
				.then((blockDefs) => {
					Context.DBTransaction((transaction) => {
						Context.Handlers.Block.AddBlockSettingDefs(authContext, transaction, blockDefs.first().get('id'), code, title, settingType.first().get('id'), defaultValue)
						.then((result) => {
							transaction.commit(result);
						}).catch((err) => {
							transaction.rollback(err);
						});
					})
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
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Block.AddBlockSetting(authContext, transaction, blockId, blockSettingDefId, value)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	module.exports = classDef;
	
})();
