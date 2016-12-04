import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class BlockService extends BaseService {
	static GetSettingTypes(authContext){
		return Context.Handlers.Setting.GetSettingTypes(authContext);
	};

	static GetSettingType(authContext, code){
		return Context.Handlers.Setting.GetSettingType(authContext, code);
	};
	
	static AddSettingType(authContext, settingType){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Setting.AddSettingType(authContext, transaction, settingType)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
}