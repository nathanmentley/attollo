import Database from "./Database";

export default class ModelEvents {
    static PurgeRelatedBeforeSaving(relatedTables) {
        return (model, columns, options) => {
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
    }

    static AuditCreated(authContext, table) {
        return (model, attrs, options) => {
            return new Promise((resolve, reject) => {
                Database.Knex.transacting(options.transacting).insert(
                    [
                        {
                            username: authContext.UserName,
                            action: 'add',
                            modeltype: table,
                            modelid: model.get('id'),
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

    static AuditUpdating(authContext, table) {
        return (model, attrs, options) => {
            return new Promise((resolve, reject) => {
                Database.Knex.transacting(options.transacting).insert(
                    [
                        {
                            username: authContext.UserName,
                            action: 'update',
                            modeltype: table,
                            modelid: model.get('id'),
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

    static AuditDestroying(authContext, table) {
        return (model, options) => {
            return new Promise((resolve, reject) => {
                Database.Knex.transacting(options.transacting).insert(
                    [
                        {
                            username: authContext.UserName,
                            action: 'delete',
                            modeltype: table,
                            modelid: model.get('id'),
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