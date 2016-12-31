export default class PluginContext {
    BuildContext(dbContext) {
        var pluginContextDef = function () {};

        pluginContextDef.prototype.TestMethod = function() {
            //return attollo.Services.Page.GetPageDefs(dbContext);
            return new Promise((resolve, reject) => { resolve(); });
        };

        return new pluginContextDef();
    }
}