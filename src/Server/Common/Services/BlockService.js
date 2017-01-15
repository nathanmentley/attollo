import { Dependencies } from 'constitute';
import jsx from 'react-jsx';

import BaseService from '../BaseService';

import ServiceContext from "../ServiceContext";

import PageService from './PageService';
import PluginService from './PluginService';
import SettingService from './SettingService';

@Dependencies(
    ServiceContext,
    PageService,
    PluginService,
    SettingService
)
export default class BlockService extends BaseService {
    constructor(
        serviceContext,
        pageService,
        pluginService,
        settingService
	) {
		super(serviceContext);

        this._PageService = pageService;
        this._PluginService = pluginService;
        this._SettingService = settingService;
    }

	//blockContainerDef
	GetBlockContainerDefs(authContext){
		return this.Context.Handlers.Block.GetBlockContainerDefs(authContext);
	};

	GetBlockContainerDef(authContext, code){
		return this.Context.Handlers.Block.GetBlockContainerDef(authContext, code);
	};

	AddBlockContainerDef(authContext, code, title){
		var self = this;
		
		return this.Context.DBTransaction((transaction) => {
            self.Context.Handlers.Block.AddBlockContainerDef(authContext, transaction, code, title)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//blockContainer

	GetBlockContainers(authContext, pageId){
		return this.Context.Handlers.Block.GetBlockContainers(authContext, pageId);
	};

	AddBlockContainers(authContext, pageId, code){
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
						self.Context.DBTransaction((transaction) => {
							self.Context.Handlers.Block.AddBlockContainers(authContext, transaction, pageId, blockContainerDef.first().get('id'), maxDisplayOrder)
							.then((blockContainer) => {
								self.GetBlockContainerAreaDefs(authContext, code)
								.then((blockContainerAreaDefs) => {
									var areaDefs = blockContainerAreaDefs.toJSON();
									var promises = [];

									for(var i = 0; i < areaDefs.length; i++) {
										promises.push(
											self.Context.Handlers.Block.AddBlockContainerArea(authContext, transaction, blockContainer.get('id'), areaDefs[i]['id'])
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
							reject(err);
						});
					}).catch((err) => {
                        reject(err);
					});
				}).catch((err) => {
                    reject(err);
				});
			} catch(e) {
                reject(e);
			}
		});
	};

	UpdateBlockContainer(authContext, blockContainer){
		var self = this;
		
		return self.Context.DBTransaction((transaction) => {
            self.Context.Handlers.Block.UpdateBlockContainer(authContext, transaction, blockContainer)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
	
	//blockContainerAreaDef

	GetBlockContainerAreaDefs(authContext, containerCode) {
		return this.Context.Handlers.Block.GetBlockContainerAreaDefs(authContext, containerCode);
	};

	AddBlockContainerAreaDef(authContext, blockContainerDefCode, code, title) {
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetBlockContainerDef(authContext, blockContainerDefCode)
			.then((blockContainerDef) => {
				self.Context.DBTransaction((transaction) => {
                    self.Context.Handlers.Block.AddBlockContainerAreaDef(authContext, transaction, blockContainerDef.first().get('id'), code, title)
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

	GetBlockContainerArea(authContext, blockContainerId, areaCode) {
		return this.Context.Handlers.Block.GetBlockContainerArea(authContext, blockContainerId, areaCode);
	};

	//blockDef

	GetBlockDefs(authContext, pageDefId){
		return this.Context.Handlers.Block.GetBlockDefs(authContext, pageDefId);
	};

	GetBlockDef(authContext, code) {
		return this.Context.Handlers.Block.GetBlockDef(authContext, code);
	};


	AddBlockDef(authContext, pluginDefCode, pageDefCode, code, name){
		var self = this;

		return new Promise((resolve, reject) => {
			this._PluginService.GetPluginDef(authContext, pluginDefCode)
			.then((pluginDef) => {
				if(pageDefCode) {
					this._PageService.GetPageDef(authContext, pageDefCode)
					.then((pageDef) => {
						self.Context.DBTransaction((transaction) => {
                            self.Context.Handlers.Block.AddBlockDef(authContext, transaction, pluginDef.first().get('id'), pageDef.first().get('id'), code, name)
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
					self.Context.DBTransaction((transaction) => {
                        self.Context.Handlers.Block.AddBlockDef(authContext, transaction, pluginDef.first().get('id'), null, code, name)
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

	AddBlockDefFunction(authContext, blockDefCode, model){
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetBlockDef(authContext, blockDefCode)
			.then((blockDef) => {
				model.compiledcontent = model.content;
				model.blockdefid = blockDef.first().get('id');

				self.Context.DBTransaction((transaction) => {
                    self.Context.Handlers.Block.AddBlockDefFunction(authContext, transaction, model)
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

	AddBlockDefDataRequest(authContext, blockDefCode, model){
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetBlockDef(authContext, blockDefCode)
			.then((blockDef) => {
				model.blockdefid = blockDef.first().get('id');

				self.Context.DBTransaction((transaction) => {
                    self.Context.Handlers.Block.AddBlockDefDataRequest(authContext, transaction, model)
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

	GetBlockTemplateDef(authContext, blockDefId, templateCode) {
		return this.Context.Handlers.Block.GetBlockTemplateDef(authContext, blockDefId, templateCode);
	};

	AddBlockTemplateDef(authContext, blockDefCode, code, name, template) {
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetBlockDef(authContext, blockDefCode)
			.then((blockDef) => {
				self.Context.DBTransaction((transaction) => {
                    self.Context.Handlers.Block.AddBlockTemplateDef(
						authContext, transaction, blockDef.first().get('id'), code, name, template, self._RenderTemplate(template)
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

	GetBlockTemplateDefs(authContext) {
		return this.Context.Handlers.Block.GetBlockTemplateDefs(authContext);
	};

	//Block

	GetBlocks(authContext, blockContainerId){
		return this.Context.Handlers.Block.GetBlocks(authContext, blockContainerId);
	};
	
	AddBlock(authContext, siteVersionId, blockContainerId, areaCode, blockDefCode, blockTemplateCode){
		var self = this;

		return new Promise(function(resolve, reject) {
			try{
				self.Context.Handlers.Site.GetSiteVersion(authContext, siteVersionId)
					.then((siteVersion) => {
                        self.GetBlockContainerArea(authContext, blockContainerId, areaCode)
                            .then((area) => {
                                self.GetBlockDef(authContext, blockDefCode)
                                    .then((blockDef) => {
                                        self.GetBlockTemplateDef(authContext, blockDef.first().get('id'), blockTemplateCode)
                                            .then((blockTemplateDef) => {
                                                self.Context.DBTransaction((transaction) => {
                                                    self.Context.Handlers.Block.AddBlock(authContext, transaction, siteVersion, blockDef.first(), blockTemplateDef.first())
                                                        .then((block) => {
                                                            self.AddBlockcontainerAreaInstance(authContext, transaction, block.get('id'), area.get('id'))
                                                                .then((result) => {
                                                                    transaction.commit(result);
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
                                                        reject(err);
                                                    });
                                            })
                                            .catch((err) => {
                                                reject(err);
                                            });
                                    }).catch((err) => {
										reject(err);
									});
                            }).catch((err) => {
								reject(err);
							});
					})
					.catch((err) => {
						reject(err);
					});
			} catch(e) {
                reject(e);
			}
		});
	};

	UpdateBlock(authContext, block) {
		var self = this;

		return new Promise((resolve, reject) => {
			self.Context.DBTransaction((transaction) => {
                self.Context.Handlers.Block.UpdateBlock(authContext, transaction, block)
				.then((result) => {
					if(block.BlockSettings.length > 0) {
						var promises = [];

						block.BlockSettings.map((x) => {
							promises.push(self.Context.Handlers.Block.UpdateBlockSetting(authContext, transaction, x));
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

	DeleteBlock(authContext, block) {
		var self = this;

		return this.Context.DBTransaction((transaction) => {
            self.Context.Handlers.Block.DeleteBlock(authContext, transaction, block)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	_RenderTemplate(template) {
		//TODO: Make this shit not fucking hacky as shit.
		return jsx.client(template).toString()
				.replace("with (data)", "")
				.replace("this.props ? this : data", "data");
	};

    //BlockcontainerAreaInstance

    AddBlockcontainerAreaInstance(authContext, transaction, block, area) {
        return this.Context.Handlers.Block.AddBlockcontainerAreaInstance(authContext, transaction, block, area);
    }

    UpdateBlockcontainerAreaInstance(authContext, blockcontainerAreaInstance) {
        var self = this;

        return new Promise((resolve, reject) => {
            self.Context.DBTransaction((transaction) => {
                self.Context.Handlers.Block.UpdateBlockcontainerAreaInstance(authContext, transaction, blockcontainerAreaInstance)
                    .then((result) => {
						transaction.commit(result);
                    }).catch((err) => {
						transaction.rollback(err);
					});
            })
                .then((result) => {
                    resolve(result);
                }).catch((err) => {
					reject({ message: err.message, err: err });
				});
        });
    }

	//BlockSettingDef

	GetBlockSettingDefs(authContext, blockDefId){
		return this.Context.Handlers.Block.GetBlockSettingDefs(authContext, blockDefId);
	};

	AddBlockSettingDefs(authContext, blockDefCode, code, title, settingTypeCode, defaultValue){
		var self = this;

		return new Promise((resolve, reject) => {
			this._SettingService.GetSettingType(authContext, settingTypeCode)
			.then((settingType) => {
				self.GetBlockDef(authContext, blockDefCode)
				.then((blockDefs) => {
					self.Context.DBTransaction((transaction) => {
                        self.Context.Handlers.Block.AddBlockSettingDefs(authContext, transaction, blockDefs.first().get('id'), code, title, settingType.first().get('id'), defaultValue)
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

	GetBlockSettings(authContext, block){
		return this.Context.Handlers.Block.GetBlockSettings(authContext, block);
	};

	AddBlockSetting(authContext, blockId, blockSettingDefId, value){
		var self = this;

		return this.Context.DBTransaction((transaction) => {
            self.Context.Handlers.Block.AddBlockSetting(authContext, transaction, blockId, blockSettingDefId, value)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
}