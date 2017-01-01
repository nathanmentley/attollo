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
            	type.Model(authContext, false).query((qb) => {
                    qb.where(type.PrimaryKey(), '=', id);
                }).fetch({ withRelated: [] })
				.then((result) => {
                    var data = result.toJson();

                    //CleanIDs.
					//Set System Data to codes.
					//YaddaYadda

					resolve(data);
				})
				.catch((err) => {
					reject(err);
				});
            });
        };
    }
};