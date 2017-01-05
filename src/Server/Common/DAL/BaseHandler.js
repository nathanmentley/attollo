export default class BaseHandler {
	constructor(handlerContext) {
		this._handlerContext = handlerContext;
	}

	get Context() { return this._handlerContext; }

	CloneModel(type) {
		var self = this;

		return (authContext, transaction, id) => {
			return new Promise((resolve, reject) => {
				self.ExportModel(Type)(authContext, id)
					.then((result) => {
						self.ImportModel(type)(authContext, transaction, result)
							.then((ret) => { resolve(ret); })
							.catch((err) => { reject(err); });
					})
					.catch((err) => { reject(err); });
			});
		};
	}

    ImportModel(type) {
        return (authContext, transaction, model) => {
            return new Promise((resolve, reject) => {
                resolve(model);
            });
        };
    }

    ExportModel(type) {
        return (authContext, id) => {
            return new Promise((resolve, reject) => {
            	//load related.
				var related = [];

                type.BelongsTo().forEach((belongsTo) => {
                	var title = belongsTo.Title;
                	if(belongsTo.Through) {
                		belongsTo.Through.forEach((through) => {
                			title = through.Title + '.' + title;
						});
					}

                    related.push(title);
                });

                type.HasMany().forEach((hasMany) => {
                    var title = hasMany.Title;
                    if(hasMany.Through) {
                        hasMany.Through.forEach((through) => {
                            title = through.Title + '.' + title;
                        });
                    }

                    related.push(title);
                });

                //Filter on id/PK
                type.Model(authContext, false).query((qb) => {
                    qb.where(type.TableName + '.' + type.PrimaryKey(), '=', id);
                }).fetch({ withRelated: related })
				.then((result) => {
                    var ret = result.toJSON();

                	//clear PKs and FKs.
					delete ret[type.PrimaryKey()];
					type.ForeignKeys().forEach((fk) => {
						delete ret[fk];
					});
                    type.BelongsTo().forEach((belongsTo) => {
                    });
                    type.HasMany().forEach((hasMany) => {
                    });

					resolve(ret);
				})
				.catch((err) => {
					reject(err);
				});
            });
        };
    }
};