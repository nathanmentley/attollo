import { Dependencies } from 'constitute';

import BaseService from '../BaseService';

import ServiceContext from "../ServiceContext";

@Dependencies(
    ServiceContext
)
export default class CssService extends BaseService {
    constructor(
        serviceContext
    ) {
        super(serviceContext);
    }

    //CssRuleDefType
	AddCssRuleDefType(authContext, name, code){
        return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Css.AddCssRuleDefType(authContext, transaction, name, code)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
	
	GetCssRuleDefType(authContext, code){
		return this.Context.Handlers.Css.GetCssRuleDefType(authContext, code);
	};
	
	//CssRuleDefGroup
	AddCssRuleDefGroup(authContext, name, code, description){
        return this.Context.DBTransaction((transaction) => {
            this.Context.Handlers.Css.AddCssRuleDefGroup(authContext, transaction, name, code, description)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
	
	GetCssRuleDefGroup(authContext, code){
		return this.Context.Handlers.Css.GetCssRuleDefGroup(authContext, code);
	};
	
	//CssRuleDef
	AddCssRuleDef(authContext, name, code, property, description, options, cssRuleDefTypeCode, cssRuleDefGroupCodes){
        var self = this;

		return new Promise((resolve, reject) => {
            self.GetCssRuleDefType(authContext, cssRuleDefTypeCode)
            .then((cssRuleDefType) => {
                self.GetCssRuleDefGroup(authContext, cssRuleDefGroupCodes)
                .then((cssRuleDefGroup) => {
                    self.Context.DBTransaction((transaction) => {
                        this.Context.Handlers.Css.AddCssRuleDef(authContext, transaction, name, code, property, description, options, cssRuleDefType.get('id'), cssRuleDefGroup.get('id'))
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
	
	GetCssRuleDef(authContext, code){
		return this.Context.Handlers.Css.GetCssRuleDef(authContext, code);
	};
	
	GetCssRuleDefs(authContext){
		return this.Context.Handlers.Css.GetCssRuleDefs(authContext);
	};
	
    //BlockCssRules
    GetBlockCssRules(authContext, blockId) {
        return this.Context.Handlers.Block.GetBlockCssRulesForBlock(authContext, blockId);
    };

    AddBlockCssRules(authContext, model) {
        var self = this;

        return new Promise((resolve, reject) => {
            self.GetCssRuleDef(authContext, model.CssRule.CssRuleDef.code)
            .then((cssRuleDef) => {
                self.Context.DBTransaction((transaction) => {
                    this.Context.Handlers.Css.AddCssRule(authContext, transaction, '#' + model.blockid, model.CssRule.value, cssRuleDef.get('id'))
                    .then((cssRule) => {
                        this.Context.Handlers.Css.AddBlockCssRule(authContext, transaction, model.blockid, cssRule.get('id'))
                        .then((result) => {
                            transaction.commit(result);
                        }).catch((err) => {
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
            
        });
    };

    UpdateBlockCssRules(authContext, rules) {
        var self = this;

        return new Promise((resolve, reject) => {
            self.Context.DBTransaction((transaction) => {
                var promises = [];

                rules.forEach((rule) => {
                    if(rule.id) {
                        promises.push(
                            this.Context.Handlers.Css.UpdateCssRule(authContext, transaction, rule.CssRule)
                        );
                    } else {
                        promises.push(
                            new Promise((subResolve, subReject) => {
                                self.GetCssRuleDef(authContext, rule.CssRule.CssRuleDef.code)
                                .then((cssRuleDef) => {
                                    this.Context.Handlers.Css.AddCssRule(authContext, transaction, '#' + rule.blockid, rule.CssRule.value, cssRuleDef.get('id'))
                                    .then((cssRule) => {
                                        this.Context.Handlers.Css.AddBlockCssRule(authContext, transaction, rule.blockid, cssRule.get('id'))
                                        .then((result) => {
                                            subResolve(result);
                                        }).catch((err) => {
                                            subReject(err);
                                        });
                                    }).catch((err) => {
                                        subReject(err);
                                    });
                                })
                                .catch((err) => {
                                    subReject(err);
                                });
                                
                            })
                        );
                    }
                });

                if (promises.length) {
                    Promise.all(promises)
                    .then((res) => {
                        transaction.commit(res);
                    })
                    .catch((err) => {
                        transaction.rollback(err);
                    });
                } else {
                    transaction.commit([]);
                }
            })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
        });
    };

	//CssRule
	AddCssRule(authContext, selector, value, cssRuleDefCode){
        var self = this;

		return new Promise((resolve, reject) => {
            self.GetCssRuleDef(authContext, cssRuleDefCode)
            .then((cssRuleDef) => {
                self.Context.DBTransaction((transaction) => {
                    this.Context.Handlers.Css.AddCssRule(authContext, transaction, selector, value, cssRuleDef.get('id'))
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

    GetSiteLess(authContext, siteId) {
        return new Promise((resolve, reject) => {
            var less = '';

            this.Context.Handlers.Site.GetSiteById(authContext, siteId)
            .then((site) => {
                var rules = site.relations['Theme'].relations['ThemeCssRules'];

                var css = {};
                rules.forEach((rule) => {
                    var cssRule = rule.relations['CssRule'];
                    var cssRuleDef = cssRule.relations['CssRuleDef'];

                    var selector = cssRule.get('selector');
                    var property = cssRuleDef.get('property');
                    var value = cssRule.get('value');

                    if(!(selector in css)) {
                        css[selector] = {};
                    }

                    css[selector][property] = value;
                });

                for (var selector in css){
                    if (css.hasOwnProperty(selector)) {
                        less += selector + ' {';
                        
                        for (var property in css[selector]) {
                            var value = css[selector][property];
                            
                            less += property + ': ' + value + ';';
                        }

                        less += '} ';
                    }
                }

                this.Context.Handlers.Block.GetBlockContainerCssRules(authContext)
                .then((containerRules) => {
                    css = {};
                    containerRules.forEach((rule) => {
                        var blockContainerId = rule.get('blockcontainerid');

                        var cssRule = rule.relations['CssRule'];
                        var cssRuleDef = cssRule.relations['CssRuleDef'];

                        var selector = cssRule.get('selector');
                        var property = cssRuleDef.get('property');
                        var value = cssRule.get('value');

                        if(!(blockContainerId in css)) {
                            css[blockContainerId] = {};
                        }

                        if(!(selector in css[blockContainerId])) {
                            css[blockContainerId][selector] = {};
                        }

                        css[blockContainerId][selector][property] = value;
                    });

                    for (var blockContainerId in css){
                        if (css.hasOwnProperty(blockContainerId)) {
                            less += "div[data-block-container-id='" + blockContainerId + "'] {";
                            for (var selector in css[blockContainerId]){
                                if (css[blockContainerId].hasOwnProperty(selector)) {
                                    if(selector != "") {
                                        less += selector + ' {';
                                    }
                                    
                                    for (var property in css[blockContainerId][selector]) {
                                        var value = css[blockContainerId][selector][property];
                                        
                                        less += property + ': ' + value + ';';
                                    }

                                    if(selector != "") {
                                        less += '} ';
                                    }
                                }
                            }
                            less += '} ';
                        }
                    }

                    this.Context.Handlers.Block.GetBlockCssRules(authContext)
                    .then((blockRules) => {
                        css = {};
                        blockRules.forEach((rule) => {
                            var blockId = rule.get('blockid');

                            var cssRule = rule.relations['CssRule'];
                            var cssRuleDef = cssRule.relations['CssRuleDef'];

                            var selector = cssRule.get('selector');
                            var property = cssRuleDef.get('property');
                            var value = cssRule.get('value');

                            if(!(blockId in css)) {
                                css[blockId] = {};
                            }

                            if(!(selector in css[blockId])) {
                                css[blockId][selector] = {};
                            }

                            css[blockId][selector][property] = value;
                        });
                        
                        for (var blockId in css){
                            if (css.hasOwnProperty(blockId)) {
                                less += "div[data-block-id='" + blockId + "'] {";
                                for (var selector in css[blockId]){
                                    if (css[blockId].hasOwnProperty(selector)) {
                                        for (var property in css[blockId][selector]) {
                                            var value = css[blockId][selector][property];
                                            
                                            less += property + ': ' + value + ';';
                                        }
                                    }
                                }
                                less += '} ';
                            }
                        }

                        resolve(less);
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
}