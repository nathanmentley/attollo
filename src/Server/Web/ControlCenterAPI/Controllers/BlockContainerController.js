import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class BlockContainerController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/BlockContainers'; }

    GetLogic(request, response) {
        return this._attollo.Services.Block.GetBlockContainers(request.AuthContext, request.query.pageId);
    }
    PostLogic(request, response) {
        return this._attollo.Services.Block.AddBlockContainers(request.AuthContext, request.body.pageId, request.body.code);
    }
    PutLogic(request, response) {
        return this._attollo.Services.Block.UpdateBlockContainer(request.AuthContext, request.body.blockContainer);
    }
};