import BaseHandler from '../BaseHandler';
export default class BlockHandler extends BaseHandler {
	//PluginDefLogicDef
	
	AddPluginDefLogicDef(authContext, transaction, model){
		var PluginDefLogicDef = this.Context.DatabaseContext.PluginDefLogicDef(authContext);
		var pluginDefLogicDef = new PluginDefLogicDef(model);

		return pluginDefLogicDef.save(null, { transacting: transaction });
	};

	//PluginDefLogicTarget
	
	AddPluginDefLogicTarget(authContext, transaction, model){
		var PluginDefLogicTarget = this.Context.DatabaseContext.PluginDefLogicTarget(authContext);
		var pluginDefLogicTarget = new PluginDefLogicTarget(model);

		return pluginDefLogicTarget.save(null, { transacting: transaction });
	};

	//PluginDef

	GetPluginDefs(authContext){
		return this.Context.DatabaseContext.PluginDefs(authContext).fetch();
	};

	GetPluginDef(authContext, code){
		return this.Context.DatabaseContext.PluginDefs(authContext)
			.query({
				where: {
					code: code
				}
			}).fetch();
	};
	
	AddPluginDef(authContext, transaction, model){
		var PluginDef = this.Context.DatabaseContext.PluginDef(authContext);
		var pluginDef = new PluginDef(model);

		return pluginDef.save(null, { transacting: transaction });
	};
	
	//Plugin

	GetPlugins(authContext){
		return this.Context.DatabaseContext.Plugins(authContext)
		.fetch({
			withRelated: ['PluginDef']
		});
	};
	
	AddPlugin(authContext, transaction, model){
		var Plugin = this.Context.DatabaseContext.Plugin(authContext);
		var plugin = new Plugin(model);

		return plugin.save(null, { transacting: transaction });
	};
	
	UpdatePlugin(authContext, transaction, model){
		var Plugin = this.Context.DatabaseContext.Plugin(authContext);
		var plugin = new Plugin(model);

		return plugin.save(null, { transacting: transaction });
	};
	
	DeletePlugin(authContext, transaction, model){
		var Plugin = this.Context.DatabaseContext.Plugin(authContext);
		var plugin = new Plugin(model);

		return plugin.destroy({ transacting: transaction });
	};
}