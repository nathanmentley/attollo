(function () {
	var sendgrid  = require('sendgrid')(
        Attollo.Utils.Config.SendGridUserName,
        Attollo.Utils.Config.SendGridPassword
    );

	var classDef = function () {};

	classDef.prototype.SendEmail = function (toAddr, fromAddr, subject, text, callback){
		sendgrid.send({
			to: toAddr,
			from: fromAddr,
			subject: subject,
			text: text
		}, callback != null ? callback : function () {});
	};
	
	module.exports = new classDef();
})();
