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
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Theme.AddTheme(authContext, transaction, code, name)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	classDef.prototype.AddThemeCssRule = function (authContext, themeCode, cssRuleDefCode, selector, value){
        var self = this;

		//cssRuleDefCode
		//Attollo.Services.Css.
		return new Promise((resolve, reject) => {
            self.GetTheme(authContext, themeCode)
            .then((theme) => {
				Attollo.Services.Css.GetCssRuleDef(authContext, cssRuleDefCode)
				.then((cssRuleDef) => {
					Context.DBTransaction((transaction) => {
						Context.Handlers.Css.AddCssRule(authContext, transaction, selector, value, cssRuleDef.get('id'))
						.then((cssRule) => {
							Context.Handlers.Theme.AddThemeCssRule(authContext, transaction, theme.get('id'), cssRule.get('id'))
							.then((result) => {
								transaction.commit(result);
							}).catch((err) => {
								transaction.rollback(err);
							});
						})
						.catch((err) => {
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

	module.exports = classDef;
})();
