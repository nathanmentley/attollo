import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class BlockContainerDefController extends BaseController {
    static get UrlEndpoint() { return '/BlockContainerDefs'; }

    static GetLogic(request, response) {
        return Attollo.Services.Block.GetBlockContainerDefs(request.AuthContext);
    }
};