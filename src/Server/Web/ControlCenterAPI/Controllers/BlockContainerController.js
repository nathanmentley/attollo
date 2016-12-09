import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class BlockContainerController extends BaseController {
    static get UrlEndpoint() { return '/BlockContainers'; }

    static GetLogic(request, response) {
        return Attollo.Services.Block.GetBlockContainers(request.AuthContext, request.query.pageId);
    }
    static PostLogic(request, response) {
        return Attollo.Services.Block.AddBlockContainers(request.AuthContext, request.body.pageId, request.body.code);
    }
    static PutLogic(request, response) {
        return Attollo.Services.Block.UpdateBlockContainer(request.AuthContext, request.body.blockContainer);
    }
};