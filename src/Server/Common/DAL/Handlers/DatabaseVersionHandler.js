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

    GetDatabaseVersions(authContext){
		return this.Context.DatabaseContext.DatabaseVersions(authContext).fetch();
	};
	
	AddDatabaseVersion(authContext, transaction, model){
		var DatabaseVersion = this.Context.DatabaseContext.DatabaseVersion(authContext);
		var databaseVersion = new DatabaseVersion(model);

		return databaseVersion.save(null, { transacting: transaction });
	};
	
	GetDatabaseCodeVersions(authContext){
		return this.Context.DatabaseContext.DatabaseCodeVersions(authContext).fetch();
	};
	
	AddDatabaseCodeVersion(authContext, transaction, model){
		var DatabaseCodeVersion = this.Context.DatabaseContext.DatabaseCodeVersion(authContext);
		var databaseCodeVersion = new DatabaseCodeVersion(model);

		return databaseCodeVersion.save(null, { transacting: transaction });
	};
}