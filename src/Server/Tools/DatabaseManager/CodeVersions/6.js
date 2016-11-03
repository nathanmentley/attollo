//Seed BlockSettingDefs

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Block.AddBlockSettingDefs(dbContext, 'Html', 'htmlContent', 'HTML Content', '<p>html content from setting</p>'),
            Attollo.Services.Block.AddBlockSettingDefs(dbContext, 'Image', 'imageUrl', 'Image Url', 'http://fpoimg.com/300x250')
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();