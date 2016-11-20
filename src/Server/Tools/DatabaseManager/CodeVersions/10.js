//Seed CssRuleDeftypes and CssRuleDefs

(function () {
	var CssRuleDefTypeCodes = require('../../../../Platform/Constants/CssRuleDefTypeCodes');
	var CssRuleDefGroupCodes = require('../../../../Platform/Constants/CssRuleDefGroupCodes');
	var CssRuleDefCodes = require('../../../../Platform/Constants/CssRuleDefCodes');

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Css.AddCssRuleDefType(dbContext, "color", CssRuleDefTypeCodes.Color),
            Attollo.Services.Css.AddCssRuleDefType(dbContext, "distance", CssRuleDefTypeCodes.Distance),
            Attollo.Services.Css.AddCssRuleDefType(dbContext, "image", CssRuleDefTypeCodes.Image),
            Attollo.Services.Css.AddCssRuleDefType(dbContext, "singleSelectList", CssRuleDefTypeCodes.SingleSelectList),

            Attollo.Services.Css.AddCssRuleDefGroup(dbContext, "Background Style", CssRuleDefGroupCodes.Background, "background"),
            Attollo.Services.Css.AddCssRuleDefGroup(dbContext, "Color Style", CssRuleDefGroupCodes.Color, "color"),
            Attollo.Services.Css.AddCssRuleDefGroup(dbContext, "Size Style", CssRuleDefGroupCodes.Size, "size"),
            Attollo.Services.Css.AddCssRuleDefGroup(dbContext, "Text Styling", CssRuleDefGroupCodes.Text, "text")
        ])
        .then(() => {
            Promise.all([
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Background Color",
                    CssRuleDefCodes.BackgroundColor,
                    "background-color",
                    "color of background",
                    "",
                    CssRuleDefTypeCodes.Color,
                    CssRuleDefGroupCodes.Color
                ),
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Font Color",
                    CssRuleDefCodes.Color,
                    "color",
                    "color of font",
                    "",
                    CssRuleDefTypeCodes.Color,
                    CssRuleDefGroupCodes.Color
                ),
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Widget Height",
                    CssRuleDefCodes.Height,
                    "height",
                    "height of element",
                    "",
                    CssRuleDefTypeCodes.Distance,
                    CssRuleDefGroupCodes.Size
                ),
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Widget Width",
                    CssRuleDefCodes.Width,
                    "width",
                    "width of element",
                    "",
                    CssRuleDefTypeCodes.Distance,
                    CssRuleDefGroupCodes.Size
                ),
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Background Image",
                    CssRuleDefCodes.BackgroundImage,
                    "background-image",
                    "Image to use as a background.",
                    "",
                    CssRuleDefTypeCodes.Image,
                    CssRuleDefGroupCodes.Background
                ),
                Attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Text Align",
                    CssRuleDefCodes.TextAlign,
                    "text-align",
                    "Text Align.",
                    "Left=left|Center=center|Right=right",
                    CssRuleDefTypeCodes.SingleSelectList,
                    CssRuleDefGroupCodes.Text
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