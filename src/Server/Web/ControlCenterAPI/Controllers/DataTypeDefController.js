import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class DataTypeDefController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/DataTypeDefs'; }

    GetLogic(request, response) {
        return this._attollo.Services.DataType.GetDataTypeDefs(request.AuthContext);
    }
    PostLogic(request, response) {
        return this._attollo.Services.DataType.AddDataTypeDef(request.AuthContext, request.body.dataTypeDef);
    }
    PutLogic(request, response) {
        return this._attollo.Services.DataType.UpdateDataTypeDef(request.AuthContext, request.body.dataTypeDef);
    }
    DeleteLogic(request, response) {
        return this._attollo.Services.DataType.DeleteDataTypeDef(request.AuthContext, { id: request.query.dataTypeDefId });
    }
};