import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class BlockContainerAreaController extends BaseController {
    static get UrlEndpoint() { return '/BlockContainerAreas'; }

    static GetLogic(request, response) {
    	return attollo.Services.Block.GetBlockContainerArea(request.AuthContext, request.query.blockContainerId, request.query.areaCode);
    }
};