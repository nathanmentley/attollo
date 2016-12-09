import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class DataTypeFieldDefController extends BaseController {
    static get UrlEndpoint() { return '/DataTypeFieldDefs'; }

    static GetLogic(request, response) {
        return Attollo.Services.DataType.GetDataTypeFieldDefs(request.AuthContext, request.query.dataTypeDefId);
    }
    static PostLogic(request, response) {
        return Attollo.Services.DataType.AddDataTypeFieldDef(request.AuthContext, request.body.dataTypeFieldDef);
    }
    static PutLogic(request, response) {
        return Attollo.Services.DataType.UpdateDataTypeFieldDef(request.AuthContext, request.body.dataTypeFieldDef);
    }
    static DeleteLogic(request, response) {
        return Attollo.Services.DataType.DeleteDataTypeFieldDef(request.AuthContext, { id: request.query.dataTypeFieldDefId });
    }
};