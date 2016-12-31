import { Dependencies } from 'constitute';

import BaseService from '../BaseService';

import ServiceContext from "../ServiceContext";

@Dependencies(
    ServiceContext
)
export default class ClientService extends BaseService {
    constructor(
        serviceContext
    ) {
        super(serviceContext);
    }

	GetClients(authContext){
		return this.Context.Handlers.Client.GetClients(authContext);
	};
	
	AddClient(authContext, name){
		var self = this;

		return self.Context.DBTransaction((transaction) => {
            self.Context.Handlers.Client.AddClient(authContext, transaction, name)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
}
