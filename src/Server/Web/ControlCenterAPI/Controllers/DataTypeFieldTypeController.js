import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class DataTypeFieldTypeController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/DataTypeFieldTypes'; }

    GetLogic(request, response) {
        return this._attollo.Services.DataType.GetDataTypeFieldTypes(request.AuthContext);
    }
};