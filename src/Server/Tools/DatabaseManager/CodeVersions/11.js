//Seed Themes

(function () {
	var ThemeCodes = require('../../../../Platform/Constants/ThemeCodes');
	var CssRuleDefCodes = require('../../../../Platform/Constants/CssRuleDefCodes');

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Theme.AddTheme(dbContext, ThemeCodes.Default, "default")
        ])
        .then(() => {
            Promise.all([
                Attollo.Services.Theme.AddThemeCssRule(dbContext, ThemeCodes.Default, CssRuleDefCodes.BackgroundColor, "body", "#336699")
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