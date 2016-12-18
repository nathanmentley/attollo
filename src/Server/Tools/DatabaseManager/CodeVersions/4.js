//Seed BlockDefs
import Attollo from '../../../Common/Attollo';

import PluginDefCodes from '../../../../Platform/Constants/PluginDefCodes';
import PageDefCodes from '../../../../Platform/Constants/PageDefCodes';
import BlockDefCodes from '../../../../Platform/Constants/BlockDefCodes';

(function () {

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Block.AddBlockDef(dbContext, PluginDefCodes.Core, null, BlockDefCodes.Html, 'Raw Html'),
            Attollo.Services.Block.AddBlockDef(dbContext, PluginDefCodes.Core, null, BlockDefCodes.Image, 'Image'),
            Attollo.Services.Block.AddBlockDef(dbContext, PluginDefCodes.Blog, PageDefCodes.BlogWall, BlockDefCodes.BlogWall, 'Blog Wall'),
            Attollo.Services.Block.AddBlockDef(dbContext, PluginDefCodes.Blog, PageDefCodes.BlogPost, BlockDefCodes.BlogPost, 'Blog Post')
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();