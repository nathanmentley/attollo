import { Dependencies } from 'constitute';

import BaseService from '../BaseService';

import ServiceContext from "../ServiceContext";

@Dependencies(
    ServiceContext
)
export default class DatabaseVersionService extends BaseService {
    constructor(
        serviceContext
    ) {
        super(serviceContext);
    }

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