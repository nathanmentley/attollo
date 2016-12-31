import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class DataTypeFieldDefController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/DataTypeFieldDefs'; }

    GetLogic(request, response) {
        return this._attollo.Services.DataType.GetDataTypeFieldDefs(request.AuthContext, request.query.dataTypeDefId);
    }
    PostLogic(request, response) {
        return this._attollo.Services.DataType.AddDataTypeFieldDef(request.AuthContext, request.body.dataTypeFieldDef);
    }
    PutLogic(request, response) {
        return this._attollo.Services.DataType.UpdateDataTypeFieldDef(request.AuthContext, request.body.dataTypeFieldDef);
    }
    DeleteLogic(request, response) {
        return this._attollo.Services.DataType.DeleteDataTypeFieldDef(request.AuthContext, { id: request.query.dataTypeFieldDefId });
    }
};