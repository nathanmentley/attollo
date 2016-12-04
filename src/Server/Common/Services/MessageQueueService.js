import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class BlockService extends BaseService {
    static RegisterProcessor(key, processor) {
        Context.Clients.WorkQueue.RegisterProcessor(key, processor);
    };
    
	static QueueMessage(exchange, routingKey, content){
		Context.Clients.WorkQueue.QueueMessage(exchange, routingKey, new Buffer(JSON.stringify(content)));
	};
}