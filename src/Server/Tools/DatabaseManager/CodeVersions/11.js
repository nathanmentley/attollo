//Seed Themes
import Attollo from '../../../Common/Attollo';

import PluginDefCodes from '../../../../Platform/Constants/PluginDefCodes';
import ThemeCodes from '../../../../Platform/Constants/ThemeCodes';
import CssRuleDefCodes from '../../../../Platform/Constants/CssRuleDefCodes';

(function () {

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Theme.AddTheme(dbContext, PluginDefCodes.Core, ThemeCodes.Default, "default"),
            Attollo.Services.Theme.AddTheme(dbContext, PluginDefCodes.Blog, ThemeCodes.BlogDefault, "blog default")
        ])
        .then(() => {
            Promise.all([
                Attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.Default, CssRuleDefCodes.BackgroundColor, "body", "#336699"),
                Attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.Default, CssRuleDefCodes.Color, "body", "#FFFFFF"),
                Attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.Default, CssRuleDefCodes.Width, "img", "100%"),
                Attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.BlogDefault, CssRuleDefCodes.BackgroundColor, "body", "#CCCCCC"),
                Attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.BlogDefault, CssRuleDefCodes.Color, "body", "#FFFFFF"),
                Attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.BlogDefault, CssRuleDefCodes.Width, "img", "100%")
             ])
             .then(() => {
                 callback();
             })
             .catch((err) => {
                 errorCallback(err);
             });
        })
        .catch((err) => {
            errorCallback(err);
        });
    };

    module.exports = new classDef();
})();