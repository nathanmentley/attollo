//Seed PageDefs

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Theme.AddTheme(dbContext, "default", "default")
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