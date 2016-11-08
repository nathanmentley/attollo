//Seed PageDefs

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        dbContext.SetClientID(1);
        Promise.all([
            Attollo.Services.Client.AddClient(dbContext, { name: 'Attollo' })
        ])
        .then(() => {
            dbContext.SetClientID(1);

            Attollo.Services.User.AddUser(dbContext, 'username', 'password', 'Admin')
            .then(() => {
                dbContext.ClearClientID();

                callback();
            })
            .catch((err) => {
                dbContext.ClearClientID();

                errorCallback(err);
            });
        })
        .catch((err) => {
            errorCallback(err);
        });
    };

    module.exports = new classDef();
})();