//Seed PageDefs

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.User.AddRole(dbContext, 'Admin', 'Admin')
        ])
        .then(() => {
            Promise.all([
                Attollo.Services.User.AddRolePermission(dbContext, 'login', 'login', 'Can Log In.', 1),
                Attollo.Services.User.AddRolePermission(dbContext, 'login2', 'login2', 'Can Log In 2.', 1)
            ])
            .then(() => {
                callback();
            })
            .catch((err) => {
                errorCallback(err);
            });
        })
        .catch((err) => {
            errorCallback(err);
        });
    };

    module.exports = new classDef();
})();