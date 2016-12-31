import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class DataTypeDefController extends BaseController {
    static get UrlEndpoint() { return '/DataTypeDefs'; }

    static GetLogic(request, response) {
        return attollo.Services.DataType.GetDataTypeDefs(request.AuthContext);
    }
    static PostLogic(request, response) {
        return attollo.Services.DataType.AddDataTypeDef(request.AuthContext, request.body.dataTypeDef);
    }
    static PutLogic(request, response) {
        return attollo.Services.DataType.UpdateDataTypeDef(request.AuthContext, request.body.dataTypeDef);
    }
    static DeleteLogic(request, response) {
        return attollo.Services.DataType.DeleteDataTypeDef(request.AuthContext, { id: request.query.dataTypeDefId });
    }
};