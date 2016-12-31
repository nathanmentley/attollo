import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class BlockController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/Blocks'; }

    GetLogic(request, response) {
        return this._attollo.Services.Block.GetBlocks(request.AuthContext, request.query.blockContainerId);
    }
    PostLogic(request, response) {
        return this._attollo.Services.Block.AddBlock(
            request.AuthContext, request.body.blockContainerId, request.body.areaCode,
            request.body.code, request.body.templateCode
        );
    }
    PutLogic(request, response) {
        return this._attollo.Services.Block.UpdateBlock(request.AuthContext, request.body.block);
    }
    DeleteLogic(request, response) {
        return this._attollo.Services.Block.DeleteBlock(request.AuthContext, { id: request.query.blockId });
    }
};