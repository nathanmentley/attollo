import BaseService from '../BaseService';

export default class MessageQueueService extends BaseService {
    RegisterProcessor(key, processor) {
        this.Context.Clients.WorkQueue.RegisterProcessor(key, processor);
    };
    
	QueueMessage(exchange, routingKey, content){
		this.Context.Clients.WorkQueue.QueueMessage(exchange, routingKey, new Buffer(JSON.stringify(content)));
	};
}