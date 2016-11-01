(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Attollo.Services.Page.AddPageDef(dbContext, { name: 'From Code', code: 'fromcode' })
        .then(() => {
            callback();
        })
        .catch(() => {
            errorCallback();
        });
    };

    module.exports = new classDef();
})();