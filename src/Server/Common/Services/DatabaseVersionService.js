import Attollo from "../Attollo";

import BaseService from '../BaseService';

export default class BlockService extends BaseService {
	static GetDatabaseVersions(authContext){
		return Context.Handlers.DatabaseVersion.GetDatabaseVersions(authContext);
	};
	
	static AddDatabaseVersion(authContext, databaseVersion){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DatabaseVersion.AddDatabaseVersion(authContext, transaction, databaseVersion)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
	
	static GetDatabaseCodeVersions(authContext){
		return Context.Handlers.DatabaseVersion.GetDatabaseCodeVersions(authContext);
	};
	
	static AddDatabaseCodeVersion(authContext, databaseCodeVersion){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DatabaseVersion.AddDatabaseCodeVersion(authContext, transaction, databaseCodeVersion)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
}