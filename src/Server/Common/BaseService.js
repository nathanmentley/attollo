import constitute from 'constitute';

import ServiceContext from "./ServiceContext";

var serviceContext = constitute(ServiceContext);

export default class BaseService {
	constructor() {

	}

	get Context() {
		return serviceContext;
	}
};