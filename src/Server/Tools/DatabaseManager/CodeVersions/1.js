//Seed PageDefs

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Page.AddPageDef(dbContext, { name: 'Custom', code: 'generic' }),
            Attollo.Services.Page.AddPageDef(dbContext, { name: 'Blog', code: 'blog' }),
            Attollo.Services.Page.AddPageDef(dbContext, { name: '404 Page', code: '404' }),
            Attollo.Services.Page.AddPageDef(dbContext, { name: 'Blog Post', code: 'Blog Post' })
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