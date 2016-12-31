//Seed BlockSettingDefs
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

var attollo = constitute(Attollo);

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            attollo.Services.Site.AddSiteVersionStatus(dbContext, 'Published', 'Published'),
            attollo.Services.Site.AddSiteVersionStatus(dbContext, 'Editing', 'Editing'),
            attollo.Services.Site.AddSiteVersionStatus(dbContext, 'Archived', 'Archived')
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();