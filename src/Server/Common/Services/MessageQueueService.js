import { Dependencies } from 'constitute';

import BaseService from '../BaseService';

import ServiceContext from "../ServiceContext";

@Dependencies(
    ServiceContext
)
export default class MessageQueueService extends BaseService {
    constructor(
        serviceContext
    ) {
        super(serviceContext);
    }

    RegisterProcessor(key, processor) {
        this.Context.Clients.WorkQueue.RegisterProcessor(key, processor);
    };
    
	QueueMessage(exchange, routingKey, content){
		this.Context.Clients.WorkQueue.QueueMessage(exchange, routingKey, new Buffer(JSON.stringify(content)));
	};
}