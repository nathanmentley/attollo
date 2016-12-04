import jsx from 'react-jsx';

import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class BlockService extends BaseService {
	//blockContainerDef
	static GetBlockContainerDefs(authContext){
		return Context.Handlers.Block.GetBlockContainerDefs(authContext);
	};

	static GetBlockContainerDef(authContext, code){
		return Context.Handlers.Block.GetBlockContainerDef(authContext, code);
	};

	static AddBlockContainerDef(authContext, code, title){
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

	static GetBlockContainers(authContext, pageId){
		return Context.Handlers.Block.GetBlockContainers(authContext, pageId);
	};

	static AddBlockContainers(authContext, pageId, code){
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

	static UpdateBlockContainer(authContext, blockContainer){
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

	static GetBlockContainerAreaDefs(authContext, containerCode) {
		return Context.Handlers.Block.GetBlockContainerAreaDefs(authContext, containerCode);
	};

	static AddBlockContainerAreaDef(authContext, blockContainerDefCode, code, title) {
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

	static GetBlockContainerArea(authContext, blockContainerId, areaCode) {
		return Context.Handlers.Block.GetBlockContainerArea(authContext, blockContainerId, areaCode);
	};

	//blockDef

	static GetBlockDefs(authContext, pageDefId){
		return Context.Handlers.Block.GetBlockDefs(authContext, pageDefId);
	};

	static GetBlockDef(authContext, code) {
		return Context.Handlers.Block.GetBlockDef(authContext, code);
	};


	static AddBlockDef(authContext, pluginDefCode, pageDefCode, code, name){
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

	static AddBlockDefFunction(authContext, blockDefCode, model){
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

	static AddBlockDefDataRequest(authContext, blockDefCode, model){
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
			.catch((err) => {
				reject(err);
			});
		});
	};

	//blockTemplateDef

	static GetBlockTemplateDef(authContext, blockDefId, templateCode) {
		return Context.Handlers.Block.GetBlockTemplateDef(authContext, blockDefId, templateCode);
	};

	static AddBlockTemplateDef(authContext, blockDefCode, code, name, template) {
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetBlockDef(authContext, blockDefCode)
			.then((blockDef) => {
				Context.DBTransaction((transaction) => {
					Context.Handlers.Block.AddBlockTemplateDef(
						authContext, transaction, blockDef.first().get('id'), code, name, template, BlockService._RenderTemplate(template)
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

	static GetBlockTemplateDefs(authContext) {
		return Context.Handlers.Block.GetBlockTemplateDefs(authContext);
	};

	//Block

	static GetBlocks(authContext, blockContainerId){
		return Context.Handlers.Block.GetBlocks(authContext, blockContainerId);
	};
	
	static AddBlock(authContext, blockContainerId, areaCode, blockDefCode, blockTemplateCode){
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

	static UpdateBlock(authContext, block) {
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

	static DeleteBlock(authContext, block) {
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
	static _RenderTemplate(template) {
		//Todo: Make this shit not fucking hacky as shit.
		return jsx.client(template).toString()
				.replace("with (data)", "")
				.replace("this.props ? this : data", "data");
	};

	//BlockSettingDef

	static GetBlockSettingDefs(authContext, blockDefId){
		return Context.Handlers.Block.GetBlockSettingDefs(authContext, blockDefId);
	};

	static AddBlockSettingDefs(authContext, blockDefCode, code, title, settingTypeCode, defaultValue){
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

	static GetBlockSettings(authContext, block){
		return Context.Handlers.Block.GetBlockSettings(authContext, block);
	};

	static AddBlockSetting(authContext, blockId, blockSettingDefId, value){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Block.AddBlockSetting(authContext, transaction, blockId, blockSettingDefId, value)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
}