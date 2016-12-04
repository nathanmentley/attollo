import BaseHandler from '../BaseHandler';
export default class BlockHandler extends BaseHandler {
	static GetClients(authContext){
		return this.Context.DatabaseContext.Clients(authContext).fetch();
	};
	
	static AddClient(authContext, transaction, name){
		var Client = this.Context.DatabaseContext.Client(authContext);
		var client = new Client({ name: name });

		return client.save(null, { transacting: transaction });
	};
}