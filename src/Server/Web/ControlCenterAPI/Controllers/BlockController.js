import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class BlockController extends BaseController {
    static get UrlEndpoint() { return '/Blocks'; }

    static GetLogic(request, response) {
        return Attollo.Services.Block.GetBlocks(request.AuthContext, request.query.blockContainerId);
    }
    static PostLogic(request, response) {
        return Attollo.Services.Block.AddBlock(
            request.AuthContext, request.body.blockContainerId, request.body.areaCode,
            request.body.code, request.body.templateCode
        );
    }
    static PutLogic(request, response) {
        return Attollo.Services.Block.UpdateBlock(request.AuthContext, request.body.block);
    }
    static DeleteLogic(request, response) {
        return Attollo.Services.Block.DeleteBlock(request.AuthContext, { id: request.query.blockId });
    }
};