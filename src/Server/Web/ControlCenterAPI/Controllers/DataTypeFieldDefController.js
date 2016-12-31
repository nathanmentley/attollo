import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class DataTypeFieldDefController extends BaseController {
    static get UrlEndpoint() { return '/DataTypeFieldDefs'; }

    static GetLogic(request, response) {
        return attollo.Services.DataType.GetDataTypeFieldDefs(request.AuthContext, request.query.dataTypeDefId);
    }
    static PostLogic(request, response) {
        return attollo.Services.DataType.AddDataTypeFieldDef(request.AuthContext, request.body.dataTypeFieldDef);
    }
    static PutLogic(request, response) {
        return attollo.Services.DataType.UpdateDataTypeFieldDef(request.AuthContext, request.body.dataTypeFieldDef);
    }
    static DeleteLogic(request, response) {
        return attollo.Services.DataType.DeleteDataTypeFieldDef(request.AuthContext, { id: request.query.dataTypeFieldDefId });
    }
};