//Seed BlockContainerDefs

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Block.AddBlockContainerDef(dbContext, 'OneCol', 'One Column'),
            Attollo.Services.Block.AddBlockContainerDef(dbContext, 'TwoCol', 'Two Column'),
            Attollo.Services.Block.AddBlockContainerDef(dbContext, 'ThreeCol', 'Three Column'),
            Attollo.Services.Block.AddBlockContainerDef(dbContext, 'FourCol', 'Four Column')
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();