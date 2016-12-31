export default class BaseHandler {
	constructor(handlerContext) {
		this._handlerContext = handlerContext;
	}

	get Context() { return this._handlerContext; }

	CloneModel(type) {
		return (authContext, transaction, model) => {
			return new Promise((resolve, reject) => {
				resolve(model);
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
};