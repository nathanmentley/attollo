import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class EmailService extends BaseService {
	SendEmail(toAddr, fromAddr, subject, text, callback){
		this.Context.Clients.Email.SendEmail(toAddr, fromAddr, subject, text, callback);
	};
	
	QueueEmail(toAddr, fromAddr, subject, text){
		Attollo.Services.MessageQueue.QueueMessage(
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