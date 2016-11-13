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
	classDef.prototype.AddCssRuleDef = function (authContext, name, code, description, options, cssRuleDefTypeCode){
        var self = this;

		return new Promise((resolve, reject) => {
            self.GetCssRuleDefType(authContext, cssRuleDefTypeCode)
            .then((cssRuleDefType) => {
                Context.Handlers.Css.AddCssRuleDef(authContext, name, code, description, options, cssRuleDefType.get('id'))
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
            Context.Handlers.Site.GetSiteById(authContext, siteId)
            .then((site) => {
                var rules = site.relations['Theme'].relations['ThemeCssRules'];

                var less = '';

                rules.forEach((rule) => {
                    var cssRule = rule.relations['CssRule'];
                    var cssRuleDef = cssRule.relations['CssRuleDef'];

                    var selector = cssRule.get('selector');
                    var property = cssRuleDef.get('name');
                    var value = cssRule.get('value');

                    less += selector + '{ ' + property + ': ' + value + ' } ';
                });

                resolve(less);
            })
            .catch((err) => {
                reject(err);
            });
        });
    };
	
	module.exports = classDef;
})();
