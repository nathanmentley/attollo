export default class BaseService {
	constructor(serviceContext) {
		this._serviceContext = serviceContext;
	}

	get Context() {
		return this._serviceContext;
	}
};