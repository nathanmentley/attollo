import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class DataTypeFieldTypeController extends BaseController {
    static get UrlEndpoint() { return '/DataTypeFieldTypes'; }

    static GetLogic(request, response) {
        return attollo.Services.DataType.GetDataTypeFieldTypes(request.AuthContext);
    }
};