import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class BlockContainerAreaController extends BaseController {
    static get UrlEndpoint() { return '/BlockContainerAreas'; }

    static GetLogic(request, response) {
    	return Attollo.Services.Block.GetBlockContainerArea(request.AuthContext, request.query.blockContainerId, request.query.areaCode);
    }
};