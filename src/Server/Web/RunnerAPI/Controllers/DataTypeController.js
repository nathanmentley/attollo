import constitute from 'constitute';

import Attollo from "../../../Common/Attollo";

import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class DataTypeController extends BaseController  {
	static get UrlEndpoint() { return '/DataTypes'; }

    static GetLogic(request, response) {
		return attollo.Services.DataType.GetDataTypes(request.AuthContext, request.query.dataTypeDefId, request.query.filter);
	}
}