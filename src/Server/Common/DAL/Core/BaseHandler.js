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
        return (authContext, transaction, model, merge) => {
            return new Promise((resolve, reject) => {
                var ImportModel = type.Model(authContext);
                var importModel = new ImportModel(Object.assign(model, merge));

                importModel.save(null, { transacting: transaction })
                    .then((result) => { resolve(result); })
                    .catch((err) => { reject(err); });
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