(function () {
	var Database = require("./Database");

	module.exports = {
        PurgeRelatedBeforeSaving: function(relatedTables) {
            var self = this;

            return function(model, columns, options) {
                return new Promise((resolve, reject) => {
                    if(model) {
                        var data = [];
                        for(var i = 0; i < relatedTables.length; i++) {
                            var table = relatedTables[i];

                            if(model.has(table) && model.get(table)) {
                                delete model.attributes[table];
                            }
                        }
                    }

                    resolve();
                });
            };
        },
        AuditCreating: function(authContext) {
            return function (model, attrs, options) {
                return new Promise((resolve, reject) => {
                    Database.Knex.transacting(options.transacting).insert(
                        [
                            {
                                username: authContext.UserName,
                                action: 'add',
                                modeltype: 'type',
                                //modelid: model.get('id'),
                                data: JSON.stringify(model)
                            }
                        ]
                    )
                    .into('audit')
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
                });
            };
        },
        AuditUpdating: function(authContext) {
            return function (model, attrs, options) {
                return new Promise((resolve, reject) => {
                    Database.Knex.transacting(options.transacting).insert(
                        [
                            {
                                username: authContext.UserName,
                                action: 'update',
                                modeltype: 'type',
                                //modelid: model.get('id'),
                                data: JSON.stringify(model)
                            }
                        ]
                    )
                    .into('audit')
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
                });
            };
        },
        AuditDestroying: function(authContext) {
            return function (model, options) {
                return new Promise((resolve, reject) => {
                    Database.Knex.transacting(options.transacting).insert(
                        [
                            {
                                username: authContext.UserName,
                                action: 'delete',
                                modeltype: 'type',
                                //modelid: model.get('id'),
                                data: JSON.stringify(model)
                            }
                        ]
                    )
                    .into('audit')
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
                });
            };
        }
    };
})();