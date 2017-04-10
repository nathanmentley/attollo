//Seed Themes
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

import PluginDefCodes from '../../../../Platform/Constants/PluginDefCodes';
import ThemeCodes from '../../../../Platform/Constants/ThemeCodes';
import CssRuleDefCodes from '../../../../Platform/Constants/CssRuleDefCodes';

var attollo = constitute(Attollo);

(function () {
    var classDef = function () {};

	function temp(dbContext) {
		return new Promise((resolve, reject) => {
			attollo.Services.Plugin.GetPluginDef(dbContext, PluginDefCodes.Core)
				.then((pluginDef) => {
					attollo.Services.Theme.AddTheme(dbContext, pluginDef.first().get('id'), ThemeCodes.Default, "default")
						.then(() => {
							Promise.all([
								attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.Default, CssRuleDefCodes.BackgroundColor, "body", "#336699"),
								attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.Default, CssRuleDefCodes.Color, "body", "#FFFFFF"),
								attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.Default, CssRuleDefCodes.Width, "img", "100%")
							])
								.then(() => {
									resolve();
								})
								.catch((err) => {
									reject(err);
								});
						})
						.catch((err) => {
							reject(err);
						});
				});
		});
	}

	function temp2(dbContext) {
		return new Promise((resolve, reject) => {
            attollo.Services.Plugin.GetPluginDef(dbContext, PluginDefCodes.Blog)
                .then((pluginDef) => {
                    attollo.Services.Theme.AddTheme(dbContext, pluginDef.first().get('id'), ThemeCodes.BlogDefault, "blog default")
                        .then(() => {
                            Promise.all([
                                attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.BlogDefault, CssRuleDefCodes.BackgroundColor, "body", "#CCCCCC"),
                                attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.BlogDefault, CssRuleDefCodes.Color, "body", "#FFFFFF"),
                                attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.BlogDefault, CssRuleDefCodes.Width, "img", "100%")
                            ])
                                .then(() => {
                                    resolve();
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
			});
		}

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
	        temp(dbContext),
	        temp2(dbContext)
        ])
        .then(() => {
            callback();
        })
        .catch((err) => {
            errorCallback(err);
        });
    };

    module.exports = new classDef();
})();