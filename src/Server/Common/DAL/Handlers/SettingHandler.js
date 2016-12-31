import { Dependencies } from 'constitute';

import BaseHandler from '../BaseHandler';
import HandlerContext from "../../HandlerContext";

@Dependencies(
    HandlerContext
)
export default class BlockHandler extends BaseHandler {
    constructor(handlerContext) {
        super(handlerContext);
    }

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