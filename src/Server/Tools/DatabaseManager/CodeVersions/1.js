(function () {
	module.exports = function(dbContext, callback, errorCallback) {
        Attollo.Services.Page.AddPageDef(dbContext, { name: 'From Code', code: 'fromcode' })
        .then(() => {
            callback();
        })
        .catch(() => {
            errorCallback();
        })
    };
})();