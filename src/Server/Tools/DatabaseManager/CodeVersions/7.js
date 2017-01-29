//Seed BlockSettingDefs
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

import BlockDefCodes from '../../../../Platform/Constants/BlockDefCodes';

var attollo = constitute(Attollo);

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            attollo.Services.Block.AddBlockSettingDefs(dbContext, BlockDefCodes.Html, 'htmlContent', 'HTML Content', 'html', '<p>html content from setting</p>'),
            attollo.Services.Block.AddBlockSettingDefs(dbContext, BlockDefCodes.Image, 'imageUrl', 'Image Url', 'image', 'http://fpoimg.com/300x250'),
            attollo.Services.Block.AddBlockSettingDefs(dbContext, BlockDefCodes.Image, 'imageCaption', 'Image Caption', 'text', 'Image Caption')
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();