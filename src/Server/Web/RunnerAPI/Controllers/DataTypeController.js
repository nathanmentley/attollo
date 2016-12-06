import Attollo from "../../../Common/Attollo";

import BaseController from '../BaseController';

export default class DataTypeController extends BaseController  {
	static get UrlEndpoint() { return '/DataTypes'; }

    static GetLogic(request, response) {
		return Attollo.Services.DataType.GetDataTypes(request.AuthContext, request.query.dataTypeDefId, request.query.filter);
	}
}