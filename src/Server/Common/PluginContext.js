export default class PluginContext {
    static BuildContext(attollo, dbContext) {
        var pluginContextDef = function () {};

        pluginContextDef.prototype.TestMethod = function() {
            return attollo.Services.Page.GetPageDefs(dbContext);
        };

        return new pluginContextDef();
    }
}