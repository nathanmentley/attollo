(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	//CssRuleDefType
	classDef.prototype.AddCssRuleDefType = function (authContext, name, code){
		return Context.Handlers.Css.AddCssRuleDefType(authContext, name, code);
	};
	
	classDef.prototype.GetCssRuleDefType = function (authContext, code){
		return Context.Handlers.Css.GetCssRuleDefType(authContext, code);
	};
	
	//CssRuleDef
	classDef.prototype.AddCssRuleDef = function (authContext, name, code, property, description, options, cssRuleDefTypeCode){
        var self = this;

		return new Promise((resolve, reject) => {
            self.GetCssRuleDefType(authContext, cssRuleDefTypeCode)
            .then((cssRuleDefType) => {
                Context.Handlers.Css.AddCssRuleDef(authContext, name, code, property, description, options, cssRuleDefType.get('id'))
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
	
	classDef.prototype.GetCssRuleDef = function (authContext, code){
		return Context.Handlers.Css.GetCssRuleDef(authContext, code);
	};
	
	classDef.prototype.GetCssRuleDefs = function (authContext){
		return Context.Handlers.Css.GetCssRuleDefs(authContext);
	};
	
	//CssRule
	classDef.prototype.AddCssRule = function (authContext, selector, value, cssRuleDefCode){
        var self = this;

		return new Promise((resolve, reject) => {
            self.GetCssRuleDef(authContext, cssRuleDefCode)
            .then((cssRuleDef) => {
                Context.Handlers.Css.AddCssRule(authContext, selector, value, cssRuleDef.get('id'))
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

    classDef.prototype.GetSiteLess = function(authContext, siteId) {
        return new Promise((resolve, reject) => {
            var less = '';

            Context.Handlers.Site.GetSiteById(authContext, siteId)
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

                Context.Handlers.Block.GetBlockContainerCssRules(authContext)
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

                    Context.Handlers.Block.GetBlockCssRules(authContext)
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

                                        if(selector != "") {
                                            less += selector + ' {';
                                        }

                                        for (var property in css[blockId][selector]) {
                                            var value = css[blockId][selector][property];
                                            
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
	
	module.exports = classDef;
})();
