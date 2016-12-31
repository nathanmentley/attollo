//Seed Themes
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

import PluginDefCodes from '../../../../Platform/Constants/PluginDefCodes';
import ThemeCodes from '../../../../Platform/Constants/ThemeCodes';
import CssRuleDefCodes from '../../../../Platform/Constants/CssRuleDefCodes';

var attollo = constitute(Attollo);

(function () {

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            attollo.Services.Theme.AddTheme(dbContext, PluginDefCodes.Core, ThemeCodes.Default, "default"),
            attollo.Services.Theme.AddTheme(dbContext, PluginDefCodes.Blog, ThemeCodes.BlogDefault, "blog default")
        ])
        .then(() => {
            Promise.all([
                attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.Default, CssRuleDefCodes.BackgroundColor, "body", "#336699"),
                attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.Default, CssRuleDefCodes.Color, "body", "#FFFFFF"),
                attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.Default, CssRuleDefCodes.Width, "img", "100%"),
                attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.BlogDefault, CssRuleDefCodes.BackgroundColor, "body", "#CCCCCC"),
                attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.BlogDefault, CssRuleDefCodes.Color, "body", "#FFFFFF"),
                attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.BlogDefault, CssRuleDefCodes.Width, "img", "100%")
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