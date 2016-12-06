//Seed PageDefs
import Attollo from '../../../Common/Attollo';

import PluginDefCodes from '../../../../Platform/Constants/PluginDefCodes';

(function () {

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Page.AddPageDef(dbContext, PluginDefCodes.Core, { name: 'Custom', code: 'generic' }),
            Attollo.Services.Page.AddPageDef(dbContext, PluginDefCodes.Blog, { name: 'Blog', code: 'blog' }),
            Attollo.Services.Page.AddPageDef(dbContext, PluginDefCodes.Core, { name: '404 Page', code: '404' }),
            Attollo.Services.Page.AddPageDef(dbContext, PluginDefCodes.Blog, { name: 'Blog Post', code: 'Blog Post' })
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