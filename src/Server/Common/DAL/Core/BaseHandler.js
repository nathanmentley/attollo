import Auid from './Auid';

import LogUtils from '../../Utils/LogUtils';

var OLD_PK_KEY = "__old_pk_key";

var flattenPromises = function(data, logic) {
    return new Promise((resolve, reject) => {
        var recursiveFunction = function(logic, i) {
            if(data.length > i) {
                logic(data[i])
                    .then(() => { recursiveFunction(logic, ++i); })
                    .catch((err) => { reject(err) });
            } else {
                resolve();
            }
        };

        recursiveFunction(logic, 0);
    });
};

export default class BaseHandler {
	constructor(handlerContext) {
		this._handlerContext = handlerContext;
	}

	get Context() { return this._handlerContext; }

	CloneModel(type) {
		var self = this;

		return (authContext, transaction, id, merge) => {
			return new Promise((resolve, reject) => {
				self.ExportModel(type)(authContext, id)
					.then((result) => {
						self.ImportModel(type)(authContext, transaction, result, merge)
							.then((ret) => { resolve(ret); })
							.catch((err) => { reject(err); });
					})
					.catch((err) => { reject(err); });
			});
		};
	}

    ImportModel(type) {
	    var importedModels = {};

	    var getSystemDataID = function(modelType, authContext, code) {
	        return modelType.Model(authContext)
                .query({
                    where: {
                        code: code
                    }
                })
                .fetch();
        };

	    var importModel = function(modelType, authContext, transaction, model) {
	        var old_primary_key = model[OLD_PK_KEY];

            LogUtils.Info("Importing Model: " + modelType.TableName + " - " + old_primary_key + " " + 1);

	        return new Promise((resolve, reject) => {
	            if(modelType.TableName + old_primary_key in importedModels) {
                    LogUtils.Info("Importing Model: " + modelType.TableName + " - " + old_primary_key + " loading already imported model");

	                resolve(importedModels[modelType.TableName + old_primary_key]);
                } else {
	                delete model[OLD_PK_KEY];

                    var systemDataIdPromises = [];
                    var belongsToPromises = [];

                    LogUtils.Info("Importing Model: " + modelType.TableName + " - " + old_primary_key + " loading required children");
                    modelType.SerializableRelations().forEach((relation) => {
                        if (relation.Type.IsSystemData) {
                            systemDataIdPromises.push(
                                new Promise((resolve2, reject2) => {
                                    getSystemDataID(relation.Type, authContext, model[relation.Title].code)
                                        .then((systemDataRecord) => {
                                            var key = systemDataRecord.get(relation.Type.PrimaryKey());
                                            model[relation.Type.TableName + 'id'] = key;

                                            resolve2(key);
                                        })
                                        .catch((err) => {
                                            reject2(err);
                                        });
                                })
                            );
                        } else if (modelType.BelongsTo().some((x) => {
                                return x.Type == relation.Type
                            })) {
                            belongsToPromises.push(
                                new Promise((resolve2, reject2) => {
                                    importModel(relation.Type, authContext, transaction, model[relation.Title])
                                        .then((belongsToRecord) => {
                                            var key = belongsToRecord.get(relation.Type.PrimaryKey());
                                            model[relation.Type.TableName + 'id'] = key;

                                            resolve2(key);
                                        })
                                        .catch((err) => {
                                            reject2(err);
                                        });
                                })
                            );
                        }
                    });

                    LogUtils.Info("Importing Model: " + modelType.TableName + " - " + old_primary_key + " loading required children - Waiting");
                    Promise.all(
                        systemDataIdPromises.concat(
                            belongsToPromises
                        )
                    )
                        .then(() => {
                            LogUtils.Info("Importing Model: " + modelType.TableName + " - " + old_primary_key + " loading required children - resolved");

                            var Model = modelType.Model(authContext);
                            var modelInstance = new Model(model);

                            modelInstance.save(null, {transacting: transaction})
                                .then((result) => {
                                    LogUtils.Info("Importing Model: " + modelType.TableName + " - " + old_primary_key + " model saved. Starting indep children");

                                    flattenPromises(
                                        modelType.SerializableRelations(),
                                        (relation) => {
                                            return new Promise((resolve2, reject2) => {
                                                LogUtils.Info("Importing Model: " + modelType.TableName + " - " + old_primary_key + " model saved. Importing relation: " + relation.Type.TableName);

                                                if ((!relation.Type.IsSystemData) &&
                                                    (!modelType.BelongsTo().some((x) => {
                                                        return x.Type == relation.Type
                                                    }))
                                                ) {
                                                    if (Array.isArray(model[relation.Title])) {
                                                        flattenPromises(
                                                            model[relation.Title],
                                                            (childModelData) => {
                                                                return new Promise((resolve3, reject3) => {
                                                                    childModelData[modelType.TableName + 'id'] = result.get(modelType.PrimaryKey());

                                                                    importModel(relation.Type, authContext, transaction, childModelData)
                                                                        .then((ret) => { resolve3(ret); })
                                                                        .catch((err) => { reject3(err); });
                                                                });
                                                            }
                                                        )
                                                            .then((ret) => { resolve2(ret); })
                                                            .catch((err) => { reject2(err); });
                                                    } else {
                                                        model[relation.Title][modelType.TableName + 'id'] = result.get(modelType.PrimaryKey());

                                                        importModel(relation.Type, authContext, transaction, model[relation.Title])
                                                            .then((ret) => { resolve2(ret); })
                                                            .catch((err) => { reject2(err); });
                                                    }
                                                } else {
                                                    resolve2();
                                                }
                                            });
                                        }
                                    )
                                        .then(() => {
                                            importedModels[modelType.TableName + old_primary_key] = result;
                                            LogUtils.Info("Importing Model: " + modelType.TableName + " - " + old_primary_key + " model cached.");
                                            resolve(result);
                                        }).catch((err) => {
                                            reject(err);
                                        });

                                }).catch((err) => {
                                    reject(err);
                                });
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            });
        };

        return (authContext, transaction, model, merge) => {
            return new Promise((resolve, reject) => {
                importModel(type, authContext, transaction, Object.assign(model, merge))
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        };
    }

    ExportModel(type) {
		//remove primary key and fks from model.
		var cleanModel = function(modelType, model) {
            if(model) {
                if (Array.isArray(model)) {
                    model.forEach((x) => {
                        cleanModel(modelType, x);
                    });
                } else {
                    model[OLD_PK_KEY] = Auid.Encode(model[modelType.PrimaryKey()]);
                    delete model[modelType.PrimaryKey()];

                    modelType.ForeignKeys().forEach((fk) => {
                        delete model[fk];
                    });

                    modelType.SerializableRelations().forEach((relation) => {
                        cleanModel(relation.Type, model[relation.Title]);
                    });
                }
            }
		};

		var getRelations = function(modelType) {
		    var ret = [];

            modelType.SerializableRelations().forEach((relation) => {
                ret.push(relation.Title);

                var children = getRelations(relation.Type);

                children.forEach((child) => {
                    ret.push(relation.Title + '.' + child);
                });
            });

            return ret;
        };

        return (authContext, id) => {
            return new Promise((resolve, reject) => {
            	//load related.
				var related = getRelations(type);

                //Filter on id/PK
                type.Model(authContext, false).query((qb) => {
                    qb.where(type.TableName + '.' + type.PrimaryKey(), '=', id);
                }).fetch({ withRelated: related })
                    .then((result) => {
                        var ret = result.toJSON();

                        cleanModel(type, ret);

                        resolve(ret);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        };
    }
};