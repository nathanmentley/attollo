//Seed BlockSettingDefs
import Attollo from '../../../Common/Attollo';

import BlockDefCodes from '../../../../Platform/Constants/BlockDefCodes';

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Block.AddBlockSettingDefs(dbContext, BlockDefCodes.Html, 'htmlContent', 'HTML Content', 'html', '<p>html content from setting</p>'),
            Attollo.Services.Block.AddBlockSettingDefs(dbContext, BlockDefCodes.Image, 'imageUrl', 'Image Url', 'text', 'http://fpoimg.com/300x250'),
            Attollo.Services.Block.AddBlockSettingDefs(dbContext, BlockDefCodes.Image, 'imageCaption', 'Image Caption', 'text', 'Image Caption')
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();