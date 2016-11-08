//Seed PageDefs

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.User.AddRole(dbContext, 'Admin', 'Admin'),
            Attollo.Services.User.AddRole(dbContext, 'UserAdmin', 'UserAdmin')
        ])
        .then(() => {
            Promise.all([
                Attollo.Services.User.AddRolePermission(dbContext, 'Login', 'Login', 'Can Log In.', 1),
                Attollo.Services.User.AddRolePermission(dbContext, 'Login2', 'Login2', 'Can Log In 2.', 1),
                Attollo.Services.User.AddRolePermission(dbContext, 'ViewUsers', 'ViewUsers', 'View Users.', 2)
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