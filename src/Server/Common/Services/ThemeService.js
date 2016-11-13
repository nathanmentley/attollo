(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetThemes = function (authContext){
		return Context.Handlers.Theme.GetThemes(authContext);
	};
	
	classDef.prototype.GetTheme = function (authContext, code){
		return Context.Handlers.Theme.GetTheme(authContext, code);
	};
	
	classDef.prototype.AddTheme = function (authContext, code, name){
		return Context.Handlers.Theme.AddTheme(authContext, code, name);
	};

	classDef.prototype.AddThemeCssRule = function (authContext, themeCode, cssRuleDefCode, selector, value){
        var self = this;

		return new Promise((resolve, reject) => {
            self.GetTheme(authContext, themeCode)
            .then((theme) => {
				Attollo.Services.Css.AddCssRule(authContext, selector, value, cssRuleDefCode)
                .then((cssRule) => {
					Context.Handlers.Theme.AddThemeCssRule(authContext, theme.get('id'), cssRule.get('id'))
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

	module.exports = classDef;
})();
