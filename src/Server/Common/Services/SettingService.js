(function () {
	var Context;
	var ServiceName;
	var classDef = function (serviceContext, name) {
		Context = serviceContext;
		ServiceName = name;
	};
	
	classDef.prototype.GetSettingTypes = function (authContext){
		return Context.Handlers.Setting.GetSettingTypes(authContext);
	};

	classDef.prototype.GetSettingType = function (authContext, code){
		return Context.Handlers.Setting.GetSettingType(authContext, code);
	};
	
	classDef.prototype.AddSettingType = function (authContext, settingType){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Setting.AddSettingType(authContext, transaction, settingType)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	module.exports = classDef;
})();
