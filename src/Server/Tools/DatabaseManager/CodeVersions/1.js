//Seed PluginDefs

(function () {
	var PluginDefCodes = require('../../../../Platform/Constants/PluginDefCodes');

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Plugin.AddPluginDef(dbContext, { name: 'Core', code: PluginDefCodes.Core, description: 'core details' }),
            Attollo.Services.Plugin.AddPluginDef(dbContext, { name: 'Blog', code: PluginDefCodes.Blog, description: 'blog details' })
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