import { Dependencies } from 'constitute';

import Attollo from "../../../Common/Attollo";
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class BlockController extends BaseController  {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/Blocks'; }

	GetLogic(request, response) {
		return this._attollo.Services.Block.GetBlocks(request.AuthContext, request.query.blockContainerId);
	}
}