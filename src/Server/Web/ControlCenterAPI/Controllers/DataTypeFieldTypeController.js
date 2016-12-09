import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class DataTypeFieldTypeController extends BaseController {
    static get UrlEndpoint() { return '/DataTypeFieldTypes'; }

    static GetLogic(request, response) {
        return Attollo.Services.DataType.GetDataTypeFieldTypes(request.AuthContext);
    }
};