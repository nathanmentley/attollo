import BaseService from '../BaseService';

export default class DatabaseVersionService extends BaseService {
	static GetDatabaseVersions(authContext){
		return this.Context.Handlers.DatabaseVersion.GetDatabaseVersions(authContext);
	}
	
	static AddDatabaseVersion(authContext, databaseVersion){
		var self = this;

		return this.Context.DBTransaction((transaction) => {
			self.Context.Handlers.DatabaseVersion.AddDatabaseVersion(authContext, transaction, databaseVersion)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	}
	
	static GetDatabaseCodeVersions(authContext){
		return this.Context.Handlers.DatabaseVersion.GetDatabaseCodeVersions(authContext);
	}
	
	static AddDatabaseCodeVersion(authContext, databaseCodeVersion){
		var self = this;
		
		return this.Context.DBTransaction((transaction) => {
			self.Context.Handlers.DatabaseVersion.AddDatabaseCodeVersion(authContext, transaction, databaseCodeVersion)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	}
}