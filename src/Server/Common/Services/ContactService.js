(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetContacts = function (success, error){
		return Context.Handlers.Contact.GetContacts(success, error);
	};
	
	classDef.prototype.AddContact = function (contact, success, error){
		Attollo.Services.Email.QueueEmail(
			"nathanmenltey@gmail.com",
			"noreply+" + Attollo.Utils.Config.Environment + "@Attollo.com",
			"[" + Attollo.Utils.Config.Environment + "] New Sales Lead",
			"New Sales Lead Info: " + contact.firstname + " " +
				contact.lastname + " " +
				contact.companyname + " " +
				contact.email + " " +
				contact.phone + " " +
				contact.info
		);
		
		return Context.Handlers.Contact.AddContact(contact, success, error);
	};
	
	module.exports = classDef;
})();
