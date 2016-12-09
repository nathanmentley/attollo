import BaseService from '../BaseService';

export default class MessageQueueService extends BaseService {
    static RegisterProcessor(key, processor) {
        this.Context.Clients.WorkQueue.RegisterProcessor(key, processor);
    };
    
	static QueueMessage(exchange, routingKey, content){
		this.Context.Clients.WorkQueue.QueueMessage(exchange, routingKey, new Buffer(JSON.stringify(content)));
	};
}