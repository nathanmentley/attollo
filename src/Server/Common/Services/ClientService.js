import BaseService from '../BaseService';

export default class ClientService extends BaseService {
	static GetClients(authContext){
		return this.Context.Handlers.Client.GetClients(authContext);
	};
	
	static AddClient(authContext, name){
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
