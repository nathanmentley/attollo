(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.SendEmail = function (toAddr, fromAddr, subject, text, callback){
		Context.Clients.Email.SendEmail(toAddr, fromAddr, subject, text, callback);
	};
	
	classDef.prototype.QueueEmail = function (toAddr, fromAddr, subject, text){
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
	
	module.exports = classDef;
})();
