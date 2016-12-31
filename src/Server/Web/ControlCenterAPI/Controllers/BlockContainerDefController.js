import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class BlockContainerDefController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/BlockContainerDefs'; }

    GetLogic(request, response) {
        return this._attollo.Services.Block.GetBlockContainerDefs(request.AuthContext);
    }
};