import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class BlockContainerAreaController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/BlockContainerAreas'; }

    GetLogic(request, response) {
    	return this._attollo.Services.Block.GetBlockContainerArea(request.AuthContext, request.query.blockContainerId, request.query.areaCode);
    }
};