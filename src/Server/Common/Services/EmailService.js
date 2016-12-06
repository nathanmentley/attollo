import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class BlockService extends BaseService {
	static SendEmail(toAddr, fromAddr, subject, text, callback){
		this.Context.Clients.Email.SendEmail(toAddr, fromAddr, subject, text, callback);
	};
	
	static QueueEmail(toAddr, fromAddr, subject, text){
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