//Seed PageDefs

(function () {
	var PluginDefCodes = require('../../../../Platform/Constants/PluginDefCodes');

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        dbContext.SetClientID(1);
        Promise.all([
            Attollo.Services.Client.AddClient(dbContext, { name: 'Attollo' })
        ])
        .then(() => {
            Promise.all([
                Attollo.Services.Plugin.AddPlugin(dbContext, PluginDefCodes.Core)
            ])
            .then(() => {
                Attollo.Services.User.AddUser(dbContext, 'username', 'password', 'Admin')
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
        })
        .catch((err) => {
            dbContext.ClearClientID();

            errorCallback(err);
        });
    };

    module.exports = new classDef();
})();