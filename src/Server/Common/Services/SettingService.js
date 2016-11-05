(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetSettingTypes = function (authContext){
		return Context.Handlers.Setting.GetSettingTypes(authContext);
	};

	classDef.prototype.GetSettingType = function (authContext, code){
		return Context.Handlers.Setting.GetSettingType(authContext, code);
	};
	
	classDef.prototype.AddSettingType = function (authContext, settingType){
		return Context.Handlers.Setting.AddSettingType(authContext, settingType);
	};

	module.exports = classDef;
})();
