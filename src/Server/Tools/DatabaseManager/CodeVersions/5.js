//Seed BlockTemplateDefs

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Block.AddBlockTemplateDef(dbContext, 'Html', 'HtmlHtml1', 'Html 1', '<p>Html 1</p>'),
            Attollo.Services.Block.AddBlockTemplateDef(dbContext, 'Html', 'HtmlHtml2', 'Html 2', '<p>Html 2</p>'),

            Attollo.Services.Block.AddBlockTemplateDef(dbContext, 'Image', 'ImageHtml1', 'Html 2', '<p>Html 1</p>'),
            Attollo.Services.Block.AddBlockTemplateDef(dbContext, 'Image', 'ImageHtml2', 'Html 2', '<p>Html 2</p>'),

            Attollo.Services.Block.AddBlockTemplateDef(dbContext, 'Blog', 'BlogHtml1', 'Html 1', '<p>Html 1</p>'),
            Attollo.Services.Block.AddBlockTemplateDef(dbContext, 'Blog', 'BlogHtml2', 'Html 2', '<p>Html 2</p>'),

            Attollo.Services.Block.AddBlockTemplateDef(dbContext, '404', '404Html1', 'Html 2', '<p>Html 1</p>'),
            Attollo.Services.Block.AddBlockTemplateDef(dbContext, '404', '404Html2', 'Html 2', '<p>Html 2</p>')
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();