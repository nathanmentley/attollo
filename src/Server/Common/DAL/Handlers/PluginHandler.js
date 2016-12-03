(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	//PluginDefLogicDef
	
	classDef.prototype.AddPluginDefLogicDef = function (authContext, transaction, model){
		var PluginDefLogicDef = this.Context.DatabaseContext.PluginDefLogicDef(authContext);
		var pluginDefLogicDef = new PluginDefLogicDef(model);

		return pluginDefLogicDef.save(null, { transacting: transaction });
	};

	//PluginDefLogicTarget
	
	classDef.prototype.AddPluginDefLogicTarget = function (authContext, transaction, model){
		var PluginDefLogicTarget = this.Context.DatabaseContext.PluginDefLogicTarget(authContext);
		var pluginDefLogicTarget = new PluginDefLogicTarget(model);

		return pluginDefLogicTarget.save(null, { transacting: transaction });
	};

	//PluginDef

	classDef.prototype.GetPluginDefs = function (authContext){
		return this.Context.DatabaseContext.PluginDefs(authContext).fetch();
	};

	classDef.prototype.GetPluginDef = function (authContext, code){
		return this.Context.DatabaseContext.PluginDefs(authContext)
			.query({
				where: {
					code: code
				}
			}).fetch();
	};
	
	classDef.prototype.AddPluginDef = function (authContext, transaction, model){
		var PluginDef = this.Context.DatabaseContext.PluginDef(authContext);
		var pluginDef = new PluginDef(model);

		return pluginDef.save(null, { transacting: transaction });
	};
	
	//Plugin

	classDef.prototype.GetPlugins = function (authContext){
		return this.Context.DatabaseContext.Plugins(authContext)
		.fetch({
			withRelated: ['PluginDef']
		});
	};
	
	classDef.prototype.AddPlugin = function (authContext, transaction, model){
		var Plugin = this.Context.DatabaseContext.Plugin(authContext);
		var plugin = new Plugin(model);

		return plugin.save(null, { transacting: transaction });
	};
	
	classDef.prototype.UpdatePlugin = function (authContext, transaction, model){
		var Plugin = this.Context.DatabaseContext.Plugin(authContext);
		var plugin = new Plugin(model);

		return plugin.save(null, { transacting: transaction });
	};
	
	classDef.prototype.DeletePlugin = function (authContext, transaction, model){
		var Plugin = this.Context.DatabaseContext.Plugin(authContext);
		var plugin = new Plugin(model);

		return plugin.destroy({ transacting: transaction });
	};

	module.exports = classDef;
})();