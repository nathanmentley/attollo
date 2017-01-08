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
	        return new Promise((resolve, reject) => {
                var systemDataIdPromises = [];
                var belongsToPromises = [];

                modelType.SerializableRelations().forEach((relation) => {
                    if(relation.Type.IsSystemData) {
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
                    } else if(modelType.BelongsTo().some((x) => { return x.Type == relation.Type })) {
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

                Promise.all(
                    systemDataIdPromises.concat(
                        belongsToPromises
                    )
                )
                    .then(() => {
                        var Model = modelType.Model(authContext);
                        var modelInstance = new Model(model);

                        modelInstance.save(null, { transacting: transaction })
                            .then((result) => {
                                var childrenImportPromises = [];

                                modelType.SerializableRelations().forEach((relation) => {
                                    if((!relation.Type.IsSystemData) &&
                                        (!modelType.BelongsTo().some((x) => { return x.Type == relation.Type }))
                                    ) {
                                        if(Array.isArray(model[relation.Title])) {
                                            model[relation.Title].forEach((childModelData) => {
                                                childModelData[modelType.TableName + 'id'] = result.get(modelType.PrimaryKey());

                                                childrenImportPromises.push(
                                                    importModel(relation.Type, authContext, transaction, childModelData)
                                                );
                                            });
                                        } else {
                                            model[relation.Title][modelType.TableName + 'id'] = result.get(modelType.PrimaryKey());

                                            childrenImportPromises.push(
                                                importModel(relation.Type, authContext, transaction, model[relation.Title])
                                            );
                                        }
                                    }
                                });

                                Promise.all(childrenImportPromises).then(() => {
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