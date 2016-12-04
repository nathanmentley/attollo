//Seed BlockTemplateDefs
import Attollo from '../../../Common/Attollo';

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Setting.AddSettingType(dbContext, { code: 'text', title: 'Text' }),
            Attollo.Services.Setting.AddSettingType(dbContext, { code: 'html', title: 'HTML' })
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();