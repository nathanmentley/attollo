//Seed BlockTemplateDefs
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

var attollo = constitute(Attollo);

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            attollo.Services.Setting.AddSettingType(dbContext, { code: 'text', title: 'Text' }),
            attollo.Services.Setting.AddSettingType(dbContext, { code: 'html', title: 'HTML' }),
            attollo.Services.Setting.AddSettingType(dbContext, { code: 'image', title: 'Image' })
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();