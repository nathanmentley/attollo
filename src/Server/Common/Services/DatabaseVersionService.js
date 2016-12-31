import BaseService from '../BaseService';

export default class DatabaseVersionService extends BaseService {
	GetDatabaseVersions(authContext){
		return this.Context.Handlers.DatabaseVersion.GetDatabaseVersions(authContext);
	}
	
	AddDatabaseVersion(authContext, databaseVersion){
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
	
	GetDatabaseCodeVersions(authContext){
		return this.Context.Handlers.DatabaseVersion.GetDatabaseCodeVersions(authContext);
	}
	
	AddDatabaseCodeVersion(authContext, databaseCodeVersion){
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