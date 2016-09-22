(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var self = {};
	var classDef = function (context) {
		baseHandler.apply(this, self, context);
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetContacts = function (success, error){
		return self.Context.DatabaseContext.Contacts.forge().fetch()
				.then(success).catch(error);
	};
	
	classDef.prototype.AddContact = function(contact, success, error) {
		return self.Context.DatabaseContext.Contact.forge().save(contact)
				.then(success).catch(error);
	};
	
	module.exports = classDef;
})();