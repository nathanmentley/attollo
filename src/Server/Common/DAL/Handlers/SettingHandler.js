(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetSettingTypes = function (authContext){
		return this.Context.DatabaseContext.SettingTypes(authContext).fetch();
	};

	classDef.prototype.GetSettingType = function (authContext, code){
		return this.Context.DatabaseContext.SettingTypes(authContext)
			.query({
				where: {
					code: code
				}
			}).fetch();
	};
	
	classDef.prototype.AddSettingType = function (authContext, transaction, model){
		var SettingType = this.Context.DatabaseContext.SettingType(authContext);
		var settingType = new SettingType(model);

		return settingType.save(null, { transacting: transaction });
	};

	module.exports = classDef;
})();