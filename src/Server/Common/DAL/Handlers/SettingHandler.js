import BaseHandler from '../BaseHandler';
export default class BlockHandler extends BaseHandler {
	GetSettingTypes(authContext){
		return this.Context.DatabaseContext.SettingTypes(authContext).fetch();
	};

	GetSettingType(authContext, code){
		return this.Context.DatabaseContext.SettingTypes(authContext)
			.query({
				where: {
					code: code
				}
			}).fetch();
	};
	
	AddSettingType(authContext, transaction, model){
		var SettingType = this.Context.DatabaseContext.SettingType(authContext);
		var settingType = new SettingType(model);

		return settingType.save(null, { transacting: transaction });
	};
}