import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class BlockContainerDefController extends BaseController {
    static get UrlEndpoint() { return '/BlockContainerDefs'; }

    static GetLogic(request, response) {
        return attollo.Services.Block.GetBlockContainerDefs(request.AuthContext);
    }
};