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

    classDef.prototype.GetSiteLess = function(authContext) {
        return new Promise((resolve, reject) => {
            resolve("@base_color: #952262; body { background-color: darken(@base_color, 11%); }");
        });
    };
	
	module.exports = classDef;
})();
