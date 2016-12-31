import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class BlockContainerController extends BaseController {
    static get UrlEndpoint() { return '/BlockContainers'; }

    static GetLogic(request, response) {
        return attollo.Services.Block.GetBlockContainers(request.AuthContext, request.query.pageId);
    }
    static PostLogic(request, response) {
        return attollo.Services.Block.AddBlockContainers(request.AuthContext, request.body.pageId, request.body.code);
    }
    static PutLogic(request, response) {
        return attollo.Services.Block.UpdateBlockContainer(request.AuthContext, request.body.blockContainer);
    }
};