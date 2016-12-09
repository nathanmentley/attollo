import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class BlockTemplateDefController extends BaseController {
    static get UrlEndpoint() { return '/BlockTemplateDefs'; }

    static GetLogic(request, response) {
        return Attollo.Services.Block.GetBlockTemplateDefs(request.AuthContext);
    }
};