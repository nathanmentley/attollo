import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class BlockDefController extends BaseController {
    static get UrlEndpoint() { return '/BlockDefs'; }

    static GetLogic(request, response) {
        return attollo.Services.Block.GetBlockDefs(request.AuthContext, request.query.pageDefId);
    }
};