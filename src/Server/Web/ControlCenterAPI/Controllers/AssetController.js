import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class AssetController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/Assets'; }

    GetLogic(request, response) {
        return this._attollo.Services.CloudStorage.Dir(request.AuthContext);
    }
    PostLogic(request, response) {
        return this._attollo.Services.CloudStorage.Save(request.AuthContext, request.body.filename, request.body.content);
    }
    DeleteLogic(request, response) {
        return this._attollo.Services.CloudStorage.Delete(request.AuthContext, request.query.filename);
    }
};