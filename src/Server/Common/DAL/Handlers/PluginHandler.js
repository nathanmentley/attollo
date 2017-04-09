import { Dependencies } from 'constitute';

import BaseHandler from '../Core/BaseHandler';
import HandlerContext from "../../HandlerContext";

@Dependencies(
    HandlerContext
)
export default class BlockHandler extends BaseHandler {
    constructor(handlerContext) {
        super(handlerContext);
    }

    //PluginDefLogicDef
	
	AddPluginDefLogicDef(authContext, transaction, model){
		var PluginDefLogicDef = this.Context.DatabaseContext.PluginDefLogicDef(authContext);
		var pluginDefLogicDef = new PluginDefLogicDef(model);

		return pluginDefLogicDef.save(null, { transacting: transaction });
	}

	GetPluginDefLogicDefs(authContext) {
		return this.Context.DatabaseContext.PluginDefLogicDefs(authContext).fetch();
	}

	//PluginDefLogicTarget
	
	AddPluginDefLogicTarget(authContext, transaction, model){
		var PluginDefLogicTarget = this.Context.DatabaseContext.PluginDefLogicTarget(authContext);
		var pluginDefLogicTarget = new PluginDefLogicTarget(model);

		return pluginDefLogicTarget.save(null, { transacting: transaction });
	}

	GetPluginDefLogicTargets(authContext) {
		return this.Context.DatabaseContext.PluginDefLogicTargets(authContext).fetch();
	}

	//GetPluginDefLogics

	AddPluginDefLogic(authContext, transaction, model) {
		var PluginDefLogic = this.Context.DatabaseContext.PluginDefLogic(authContext);
		var pluginDefLogic = new PluginDefLogic(model);

		return pluginDefLogic.save(null, { transacting: transaction });
	}

	GetPluginDefLogics(authContext, pluginDefId) {
		return this.Context.DatabaseContext.PluginDefLogics(authContext)
			.query({
				where: {
					plugindefid: pluginDefId
				}
			}).fetch();
	}

	UpdatePluginDefLogic(authContext, transaction, model){
		var PluginDefLogic = this.Context.DatabaseContext.PluginDefLogic(authContext);
		var pluginDefLogic = new PluginDefLogic(model);

		return pluginDefLogic.save(null, { transacting: transaction });
	};

	DeletePluginDefLogic(authContext, transaction, model) {
		var PluginDefLogic = this.Context.DatabaseContext.PluginDefLogic(authContext);
		var pluginDefLogic = new PluginDefLogic(model);

		return pluginDefLogic.destroy({ transacting: transaction });
	}

	//PluginDef

	GetPluginDefs(authContext){
		return this.Context.DatabaseContext.PluginDefs(authContext).fetch();
	}

	GetPluginDef(authContext, code){
		return this.Context.DatabaseContext.PluginDefs(authContext)
			.query({
				where: {
					code: code
				}
			}).fetch();
	}
	
	AddPluginDef(authContext, transaction, model){
		var PluginDef = this.Context.DatabaseContext.PluginDef(authContext);
		var pluginDef = new PluginDef(model);

		return pluginDef.save(null, { transacting: transaction });
	}
	
	//Plugin

	GetPlugins(authContext){
		return this.Context.DatabaseContext.Plugins(authContext)
		.fetch({
			withRelated: ['PluginDef']
		});
	}
	
	AddPlugin(authContext, transaction, model){
		var Plugin = this.Context.DatabaseContext.Plugin(authContext);
		var plugin = new Plugin(model);

		return plugin.save(null, { transacting: transaction });
	}
	
	UpdatePlugin(authContext, transaction, model){
		var Plugin = this.Context.DatabaseContext.Plugin(authContext);
		var plugin = new Plugin(model);

		return plugin.save(null, { transacting: transaction });
	}
	
	DeletePlugin(authContext, transaction, model){
		var Plugin = this.Context.DatabaseContext.Plugin(authContext);
		var plugin = new Plugin(model);

		return plugin.destroy({ transacting: transaction });
	}
}