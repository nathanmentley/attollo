import { Dependencies } from 'constitute';

import BaseHandler from '../Core/BaseHandler';
import HandlerContext from "../../HandlerContext";

@Dependencies(
    HandlerContext
)
export default class BlockHandler extends BaseHandler {
    constructor(handlerContext) {
        super(handlerContext);
    }

    GetClients(authContext){
		return this.Context.DatabaseContext.Clients(authContext).fetch();
	};
	
	AddClient(authContext, transaction, name){
		var Client = this.Context.DatabaseContext.Client(authContext);
		var client = new Client({ name: name });

		return client.save(null, { transacting: transaction });
	};
}