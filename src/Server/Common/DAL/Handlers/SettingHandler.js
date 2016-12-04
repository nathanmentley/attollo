import BaseHandler from '../BaseHandler';
export default class BlockHandler extends BaseHandler {
	static GetSettingTypes(authContext){
		return this.Context.DatabaseContext.SettingTypes(authContext).fetch();
	};

	static GetSettingType(authContext, code){
		return this.Context.DatabaseContext.SettingTypes(authContext)
			.query({
				where: {
					code: code
				}
			}).fetch();
	};
	
	static AddSettingType(authContext, transaction, model){
		var SettingType = this.Context.DatabaseContext.SettingType(authContext);
		var settingType = new SettingType(model);

		return settingType.save(null, { transacting: transaction });
	};
}