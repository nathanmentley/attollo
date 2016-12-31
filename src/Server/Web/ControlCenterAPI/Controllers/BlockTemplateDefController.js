import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class BlockTemplateDefController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/BlockTemplateDefs'; }

    GetLogic(request, response) {
        return this._attollo.Services.Block.GetBlockTemplateDefs(request.AuthContext);
    }
};