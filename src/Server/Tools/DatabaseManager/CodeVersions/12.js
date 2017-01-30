//Seed PageDefs
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

import PluginDefCodes from '../../../../Platform/Constants/PluginDefCodes';

var attollo = constitute(Attollo);

(function () {

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        dbContext.SetClientID(1);
        Promise.all([
            attollo.Services.Client.AddClient(dbContext, { name: 'Attollo' })
        ])
        .then(() => {
            attollo.Services.User.AddUser(dbContext, 'username', 'password', 'Admin')
                .then(() => {
                    dbContext.ClearClientID();

                    callback();
                })
                .catch((err) => {
                    dbContext.ClearClientID();

                    errorCallback(err);
                });
        })
        .catch((err) => {
            dbContext.ClearClientID();

            errorCallback(err);
        });
    };

    module.exports = new classDef();
})();