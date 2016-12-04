import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class BlockService extends BaseService {
	static GetClients(authContext){
		return Context.Handlers.Client.GetClients(authContext);
	};
	
	static AddClient(authContext, name){
		return Context.DBTransaction((transaction) => {
            Context.Handlers.Client.AddClient(authContext, transaction, name)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
}
