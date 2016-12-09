import BaseService from '../BaseService';

export default class SettingService extends BaseService {
	static GetSettingTypes(authContext){
		return this.Context.Handlers.Setting.GetSettingTypes(authContext);
	};

	static GetSettingType(authContext, code){
		return this.Context.Handlers.Setting.GetSettingType(authContext, code);
	};
	
	static AddSettingType(authContext, settingType){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Setting.AddSettingType(authContext, transaction, settingType)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
}