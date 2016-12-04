import BaseHandler from '../BaseHandler';
export default class BlockHandler extends BaseHandler {
	static GetDatabaseVersions(authContext){
		return this.Context.DatabaseContext.DatabaseVersions(authContext).fetch();
	};
	
	static AddDatabaseVersion(authContext, transaction, model){
		var DatabaseVersion = this.Context.DatabaseContext.DatabaseVersion(authContext);
		var databaseVersion = new DatabaseVersion(model);

		return databaseVersion.save(null, { transacting: transaction });
	};
	
	static GetDatabaseCodeVersions(authContext){
		return this.Context.DatabaseContext.DatabaseCodeVersions(authContext).fetch();
	};
	
	static AddDatabaseCodeVersion(authContext, transaction, model){
		var DatabaseCodeVersion = this.Context.DatabaseContext.DatabaseCodeVersion(authContext);
		var databaseCodeVersion = new DatabaseCodeVersion(model);

		return databaseCodeVersion.save(null, { transacting: transaction });
	};
}