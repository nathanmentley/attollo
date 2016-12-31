import { Dependencies } from 'constitute';

import Attollo from "../../../Common/Attollo";
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class DataTypeController extends BaseController  {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/DataTypes'; }

	GetLogic(request, response) {
		return this._attollo.Services.DataType.GetDataTypes(request.AuthContext, request.query.dataTypeDefId, request.query.filter);
	}
}