import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class BlockController extends BaseController {
    static get UrlEndpoint() { return '/Blocks'; }

    static GetLogic(request, response) {
        return attollo.Services.Block.GetBlocks(request.AuthContext, request.query.blockContainerId);
    }
    static PostLogic(request, response) {
        return attollo.Services.Block.AddBlock(
            request.AuthContext, request.body.blockContainerId, request.body.areaCode,
            request.body.code, request.body.templateCode
        );
    }
    static PutLogic(request, response) {
        return attollo.Services.Block.UpdateBlock(request.AuthContext, request.body.block);
    }
    static DeleteLogic(request, response) {
        return attollo.Services.Block.DeleteBlock(request.AuthContext, { id: request.query.blockId });
    }
};