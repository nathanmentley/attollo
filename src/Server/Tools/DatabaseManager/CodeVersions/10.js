//Seed CssRuleDeftypes and CssRuleDefs
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

import CssRuleDefTypeCodes from '../../../../Platform/Constants/CssRuleDefTypeCodes';
import CssRuleDefGroupCodes from '../../../../Platform/Constants/CssRuleDefGroupCodes';
import CssRuleDefCodes from '../../../../Platform/Constants/CssRuleDefCodes';

var attollo = constitute(Attollo);

(function () {

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            attollo.Services.Css.AddCssRuleDefType(dbContext, "color", CssRuleDefTypeCodes.Color),
            attollo.Services.Css.AddCssRuleDefType(dbContext, "distance", CssRuleDefTypeCodes.Distance),
            attollo.Services.Css.AddCssRuleDefType(dbContext, "image", CssRuleDefTypeCodes.Image),
            attollo.Services.Css.AddCssRuleDefType(dbContext, "singleSelectList", CssRuleDefTypeCodes.SingleSelectList),

            attollo.Services.Css.AddCssRuleDefGroup(dbContext, "Background Style", CssRuleDefGroupCodes.Background, "background"),
            attollo.Services.Css.AddCssRuleDefGroup(dbContext, "Color Style", CssRuleDefGroupCodes.Color, "color"),
            attollo.Services.Css.AddCssRuleDefGroup(dbContext, "Size Style", CssRuleDefGroupCodes.Size, "size"),
            attollo.Services.Css.AddCssRuleDefGroup(dbContext, "Text Styling", CssRuleDefGroupCodes.Text, "text")
        ])
        .then(() => {
            Promise.all([
                attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Background Color",
                    CssRuleDefCodes.BackgroundColor,
                    "background-color",
                    "color of background",
                    "",
                    CssRuleDefTypeCodes.Color,
                    CssRuleDefGroupCodes.Color
                ),
                attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Font Color",
                    CssRuleDefCodes.Color,
                    "color",
                    "color of font",
                    "",
                    CssRuleDefTypeCodes.Color,
                    CssRuleDefGroupCodes.Color
                ),
                attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Widget Height",
                    CssRuleDefCodes.Height,
                    "height",
                    "height of element",
                    "",
                    CssRuleDefTypeCodes.Distance,
                    CssRuleDefGroupCodes.Size
                ),
                attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Widget Width",
                    CssRuleDefCodes.Width,
                    "width",
                    "width of element",
                    "",
                    CssRuleDefTypeCodes.Distance,
                    CssRuleDefGroupCodes.Size
                ),
                attollo.Services.Css.AddCssRuleDef(dbContext,
                    "Background Image",
                    CssRuleDefCodes.BackgroundImage,
                    "background-image",
                    "Image to use as a background.",
                    "",
                    CssRuleDefTypeCodes.Image,
                    CssRuleDefGroupCodes.Background
                ),
                attollo.Services.Css.AddCssRuleDef(dbContext,
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