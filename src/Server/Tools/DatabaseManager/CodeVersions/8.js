//Seed BlockSettingDefs
import Attollo from '../../../Common/Attollo';

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Site.AddSiteVersionStatus(dbContext, 'Published', 'Published'),
            Attollo.Services.Site.AddSiteVersionStatus(dbContext, 'Editing', 'Editing'),
            Attollo.Services.Site.AddSiteVersionStatus(dbContext, 'Archived', 'Archived')
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();