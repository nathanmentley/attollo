//Seed PageDefs
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

import PageDefCodes from '../../../../Platform/Constants/PageDefCodes';
import PluginDefCodes from '../../../../Platform/Constants/PluginDefCodes';

var attollo = constitute(Attollo);

(function () {

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            attollo.Services.Page.AddPageDef(dbContext, PluginDefCodes.Core, { name: 'Custom', code: PageDefCodes.Generic }),
            attollo.Services.Page.AddPageDef(dbContext, PluginDefCodes.Core, { name: '404 Page', code: PageDefCodes.Error404 }),
            attollo.Services.Page.AddPageDef(dbContext, PluginDefCodes.Blog, { name: 'Blog', code: PageDefCodes.Blog }),
            attollo.Services.Page.AddPageDef(dbContext, PluginDefCodes.Blog, { name: 'Blog Post', code: PageDefCodes.BlogPost })
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