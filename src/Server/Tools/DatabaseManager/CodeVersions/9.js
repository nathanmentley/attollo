//Seed PageDefs

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.User.AddPermissionDef(dbContext, 'Login', 'Login', 'Can Log In.'),
            Attollo.Services.User.AddPermissionDef(dbContext, 'Login2', 'Login2', 'Can Log In 2.'),
            Attollo.Services.User.AddPermissionDef(dbContext, 'ViewUsers', 'ViewUsers', 'View Users.')
        ])
        .then(() => {
            Promise.all([
                Attollo.Services.User.AddRole(dbContext, 'Admin', 'Admin'),
                Attollo.Services.User.AddRole(dbContext, 'UserAdmin', 'UserAdmin')
            ])
            .then(() => {
                Promise.all([
                    Attollo.Services.User.AddRolePermission(dbContext, 'Login', 'Admin'),
                    Attollo.Services.User.AddRolePermission(dbContext, 'Login2', 'Admin'),
                    Attollo.Services.User.AddRolePermission(dbContext, 'ViewUsers', 'UserAdmin')
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
        })
        .catch((err) => {
            errorCallback(err);
        });
    };

    module.exports = new classDef();
})();