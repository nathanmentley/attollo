import { Dependencies } from 'constitute';

import BaseService from '../BaseService';

import ServiceContext from "../ServiceContext";

import MessageQueueService from './MessageQueueService';

@Dependencies(
    ServiceContext,
    MessageQueueService
)
export default class EmailService extends BaseService {
    constructor(
        serviceContext,
        messageQueueService
    ) {
        super(serviceContext);

        this._MessageQueueService = messageQueueService;
    }

    SendEmail(toAddr, fromAddr, subject, text, callback){
		this.Context.Clients.Email.SendEmail(toAddr, fromAddr, subject, text, callback);
	};
	
	QueueEmail(toAddr, fromAddr, subject, text){
		this._MessageQueueService.QueueMessage(
			"",
			"email",
			{
				toAddr: toAddr,
				fromAddr: fromAddr,
				subject: subject,
				text: text
			}
		);
	};
}