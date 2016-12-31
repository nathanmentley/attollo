import BaseService from '../BaseService';

export default class SettingService extends BaseService {
	GetSettingTypes(authContext){
		return this.Context.Handlers.Setting.GetSettingTypes(authContext);
	};

	GetSettingType(authContext, code){
		return this.Context.Handlers.Setting.GetSettingType(authContext, code);
	};
	
	AddSettingType(authContext, settingType){
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