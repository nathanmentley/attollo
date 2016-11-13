//Seed CssRuleDeftypes and CssRuleDefs

(function () {
	var CssRuleDefTypeCodes = require('../../../../Platform/Constants/CssRuleDefTypeCodes');
	var CssRuleDefCodes = require('../../../../Platform/Constants/CssRuleDefCodes');

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Css.AddCssRuleDefType(dbContext, "color", CssRuleDefTypeCodes.Color),
            Attollo.Services.Css.AddCssRuleDefType(dbContext, "distance", CssRuleDefTypeCodes.Distance)
        ])
        .then(() => {
            Promise.all([
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "background-color",
                    CssRuleDefCodes.BackgroundColor,
                    "color of background",
                    "",
                    CssRuleDefTypeCodes.Color
                ),
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "color",
                    CssRuleDefCodes.Color,
                    "color of font",
                    "",
                    CssRuleDefTypeCodes.Color
                ),
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "height",
                    CssRuleDefCodes.Height,
                    "height of element",
                    "",
                    CssRuleDefTypeCodes.Distance
                ),
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "width",
                    CssRuleDefCodes.Width,
                    "width of element",
                    "",
                    CssRuleDefTypeCodes.Distance
                )
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