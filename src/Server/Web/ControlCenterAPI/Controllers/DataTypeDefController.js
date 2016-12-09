import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class DataTypeDefController extends BaseController {
    static get UrlEndpoint() { return '/DataTypeDefs'; }

    static GetLogic(request, response) {
        return Attollo.Services.DataType.GetDataTypeDefs(request.AuthContext);
    }
    static PostLogic(request, response) {
        return Attollo.Services.DataType.AddDataTypeDef(request.AuthContext, request.body.dataTypeDef);
    }
    static PutLogic(request, response) {
        return Attollo.Services.DataType.UpdateDataTypeDef(request.AuthContext, request.body.dataTypeDef);
    }
    static DeleteLogic(request, response) {
        return Attollo.Services.DataType.DeleteDataTypeDef(request.AuthContext, { id: request.query.dataTypeDefId });
    }
};