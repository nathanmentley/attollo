import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class BlockContainerAreaInstanceController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/BlockContainerAreaInstances'; }

    PutLogic(request, response) {
        return this._attollo.Services.Block.UpdateBlockcontainerAreaInstance(request.AuthContext, request.body.blockContainerAreaInstance);
    }
};