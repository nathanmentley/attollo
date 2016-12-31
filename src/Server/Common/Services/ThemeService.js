import { Dependencies } from 'constitute';

import BaseService from '../BaseService';

import ServiceContext from "../ServiceContext";

import CssService from './CssService';
import PluginService from './PluginService';

@Dependencies(
    ServiceContext,
    CssService,
    PluginService
)
export default class ThemeService extends BaseService {
    constructor(
        serviceContext,
        cssService,
        pluginService
    ) {
        super(serviceContext);

        this._CssService = cssService;
        this._PluginService = pluginService;
    }

    GetThemes(authContext){
		return this.Context.Handlers.Theme.GetThemes(authContext);
	};
	
	GetTheme(authContext, code){
		return this.Context.Handlers.Theme.GetTheme(authContext, code);
	};
	
	AddTheme(authContext, pluginDefCode, code, name){
		var self = this;

		return new Promise((resolve, reject) => {
			this._PluginService.GetPluginDef(authContext, pluginDefCode)
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

	AddThemeCssRule(authContext, themeCode, cssRuleDefCode, selector, value){
        var self = this;

		//cssRuleDefCode
		//this._CssService.
		return new Promise((resolve, reject) => {
            self.GetTheme(authContext, themeCode)
            .then((theme) => {
				this._CssService.GetCssRuleDef(authContext, cssRuleDefCode)
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