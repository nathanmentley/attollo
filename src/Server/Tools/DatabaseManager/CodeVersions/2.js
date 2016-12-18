//Seed PageDefs
import Attollo from '../../../Common/Attollo';

import PageDefCodes from '../../../../Platform/Constants/PageDefCodes';
import PluginDefCodes from '../../../../Platform/Constants/PluginDefCodes';

(function () {

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Page.AddPageDef(dbContext, PluginDefCodes.Core, { name: 'Custom', code: PageDefCodes.Generic }),
            Attollo.Services.Page.AddPageDef(dbContext, PluginDefCodes.Core, { name: '404 Page', code: PageDefCodes.Error404 }),
            Attollo.Services.Page.AddPageDef(dbContext, PluginDefCodes.Blog, { name: 'Blog', code: PageDefCodes.Blog }),
            Attollo.Services.Page.AddPageDef(dbContext, PluginDefCodes.Blog, { name: 'Blog Post', code: PageDefCodes.BlogPost })
        ])
        .then(() => {
            callback();
        })
        .catch((err) => {
            errorCallback(err);
        });
    };

    module.exports = new classDef();
})();