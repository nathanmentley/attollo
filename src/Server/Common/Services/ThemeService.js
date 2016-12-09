import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class ThemeService extends BaseService {
	static GetThemes(authContext){
		return this.Context.Handlers.Theme.GetThemes(authContext);
	};
	
	static GetTheme(authContext, code){
		return this.Context.Handlers.Theme.GetTheme(authContext, code);
	};
	
	static AddTheme(authContext, pluginDefCode, code, name){
		var self = this;

		return new Promise((resolve, reject) => {
			Attollo.Services.Plugin.GetPluginDef(authContext, pluginDefCode)
			.then((pluginDef) => {
				self.Context.DBTransaction((transaction) => {
					this.Context.Handlers.Theme.AddTheme(authContext, transaction, pluginDef.first().get('id'), code, name)
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

	static AddThemeCssRule(authContext, themeCode, cssRuleDefCode, selector, value){
        var self = this;

		//cssRuleDefCode
		//Attollo.Services.Css.
		return new Promise((resolve, reject) => {
            self.GetTheme(authContext, themeCode)
            .then((theme) => {
				Attollo.Services.Css.GetCssRuleDef(authContext, cssRuleDefCode)
				.then((cssRuleDef) => {
					self.Context.DBTransaction((transaction) => {
						this.Context.Handlers.Css.AddCssRule(authContext, transaction, selector, value, cssRuleDef.get('id'))
						.then((cssRule) => {
							this.Context.Handlers.Theme.AddThemeCssRule(authContext, transaction, theme.get('id'), cssRule.get('id'))
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
}