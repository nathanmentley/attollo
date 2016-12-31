import constitute from 'constitute';

import HandlerContext from "../HandlerContext";

var handlerContext = constitute(HandlerContext);

export default class BaseHandler {
	get Context() { return handlerContext; }

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