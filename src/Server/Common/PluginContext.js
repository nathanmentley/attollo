(function () {
    var classDef = function () {};

    classDef.prototype.BuildContext = function (attollo, dbContext) {
        var pluginContextDef = function () {};

        pluginContextDef.prototype.TestMethod = function() {
            return attollo.Services.Page.GetPageDefs(dbContext);
        };

        return new pluginContextDef();
    };

    module.exports = new classDef();
})();
