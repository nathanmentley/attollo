import constitute from 'constitute';

import ServiceContext from "./ServiceContext";

var serviceContext = constitute(ServiceContext);

export default class BaseService {
	get Context() {
		return serviceContext;
	}
};