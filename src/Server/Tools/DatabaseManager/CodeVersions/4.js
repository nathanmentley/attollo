//Seed BlockDefs

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Block.AddBlockDef(dbContext, null, 'Html', 'Raw Html'),
            Attollo.Services.Block.AddBlockDef(dbContext, null, 'Image', 'Image'),
            Attollo.Services.Block.AddBlockDef(dbContext, 'blog', 'Blog', 'Blog'),
            Attollo.Services.Block.AddBlockDef(dbContext, '404', '404', '404')
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();