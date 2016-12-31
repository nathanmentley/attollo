import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class BlockTemplateDefController extends BaseController {
    static get UrlEndpoint() { return '/BlockTemplateDefs'; }

    static GetLogic(request, response) {
        return attollo.Services.Block.GetBlockTemplateDefs(request.AuthContext);
    }
};