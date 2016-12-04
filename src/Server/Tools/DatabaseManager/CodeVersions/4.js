//Seed BlockDefs
import Attollo from '../../../Common/Attollo';

(function () {
	import PluginDefCodes from '../../../../Platform/Constants/PluginDefCodes';

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Block.AddBlockDef(dbContext, PluginDefCodes.Core, null, 'Html', 'Raw Html'),
            Attollo.Services.Block.AddBlockDef(dbContext, PluginDefCodes.Core, null, 'Image', 'Image')
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();