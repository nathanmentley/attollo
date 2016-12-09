import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class BlockDefController extends BaseController {
    static get UrlEndpoint() { return '/BlockDefs'; }

    static GetLogic(request, response) {
        return Attollo.Services.Block.GetBlockDefs(request.AuthContext, request.query.pageDefId);
    }
};