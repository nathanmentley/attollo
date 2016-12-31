//Seed BlockDefs
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

var attollo = constitute(Attollo);

import PluginDefCodes from '../../../../Platform/Constants/PluginDefCodes';
import PageDefCodes from '../../../../Platform/Constants/PageDefCodes';
import BlockDefCodes from '../../../../Platform/Constants/BlockDefCodes';

(function () {

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            attollo.Services.Block.AddBlockDef(dbContext, PluginDefCodes.Core, null, BlockDefCodes.Html, 'Raw Html'),
            attollo.Services.Block.AddBlockDef(dbContext, PluginDefCodes.Core, null, BlockDefCodes.Image, 'Image'),
            attollo.Services.Block.AddBlockDef(dbContext, PluginDefCodes.Blog, PageDefCodes.BlogWall, BlockDefCodes.BlogWall, 'Blog Wall'),
            attollo.Services.Block.AddBlockDef(dbContext, PluginDefCodes.Blog, PageDefCodes.BlogPost, BlockDefCodes.BlogPost, 'Blog Post')
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();