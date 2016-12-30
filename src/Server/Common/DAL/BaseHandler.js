import HandlerContext from "../HandlerContext";

export default class BaseHandler {
	static get Context() { return HandlerContext; }

	static CloneModel(type) {
		return (authContext, transaction, model) => {
			return new Promise((resolve, reject) => {
				resolve(model);
			});
		};
	}

	static ImportModel(type) {
		return (authContext, transaction, model) => {
			return new Promise((resolve, reject) => {
				resolve(model);
			});
		};
	}
};