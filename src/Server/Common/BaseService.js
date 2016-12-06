import ServiceContext from "./ServiceContext";

export default class BaseService {
	static get Context() { return ServiceContext; }
};