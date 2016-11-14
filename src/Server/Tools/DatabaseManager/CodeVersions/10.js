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
                    "Background Color",
                    CssRuleDefCodes.BackgroundColor,
                    "background-color",
                    "color of background",
                    "",
                    CssRuleDefTypeCodes.Color
                ),
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Font Color",
                    CssRuleDefCodes.Color,
                    "color",
                    "color of font",
                    "",
                    CssRuleDefTypeCodes.Color
                ),
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Widget Height",
                    CssRuleDefCodes.Height,
                    "height",
                    "height of element",
                    "",
                    CssRuleDefTypeCodes.Distance
                ),
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Widget Width",
                    CssRuleDefCodes.Width,
                    "width",
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