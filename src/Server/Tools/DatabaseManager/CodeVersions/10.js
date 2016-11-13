//Seed CssRuleDeftypes and CssRuleDefs

(function () {
	var CssRuleDefTypeCodes = require('../../../../Platform/Constants/CssRuleDefTypeCodes');
	var CssRuleDefCodes = require('../../../../Platform/Constants/CssRuleDefCodes');

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Css.AddCssRuleDefType(dbContext, "color", CssRuleDefTypeCodes.Color)
        ])
        .then(() => {
            Promise.all([
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "background-color",
                    CssRuleDefCodes.BackgroundColor,
                    "color of background",
                    "",
                    CssRuleDefTypeCodes.Color
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