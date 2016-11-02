//Seed BlockContainerAreaDefs

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'OneCol', 'First', 'First'),

            Attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'TwoCol', 'First', 'First'),
            Attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'TwoCol', 'Second', 'Second'),

            Attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'ThreeCol', 'First', 'First'),
            Attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'ThreeCol', 'Second', 'Second'),
            Attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'ThreeCol', 'Third', 'Third'),

            Attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'FourCol', 'First', 'First'),
            Attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'FourCol', 'Second', 'Second'),
            Attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'FourCol', 'Third', 'Third'),
            Attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'FourCol', 'Fourth', 'Fourth')
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();