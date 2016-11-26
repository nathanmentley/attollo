(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
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
		var PluginDef = new PluginDef(model);

		return PluginDef.save(null, { transacting: transaction });
	};
	
	classDef.prototype.GetPlugins = function (authContext){
		return this.Context.DatabaseContext.Plugins(authContext)
			.query({
				where: {
					siteversionid: siteVersionId
				}
			}).fetch();
	};
	
	classDef.prototype.AddPlugin = function (authContext, transaction, model){
		model.clientid = authContext.ClientID;
		
		var Plugin = this.Context.DatabaseContext.Plugin(authContext);
		var Plugin = new Plugin(model);

		return Plugin.save(null, { transacting: transaction });
	};
	
	classDef.prototype.UpdatePlugin = function (authContext, transaction, model){
		var Plugin = this.Context.DatabaseContext.Plugin(authContext);
		var Plugin = new Plugin(model);

		return Plugin.save(null, { transacting: transaction });
	};
	
	classDef.prototype.DeletePlugin = function (authContext, transaction, model){
		var Plugin = this.Context.DatabaseContext.Plugin(authContext);
		var Plugin = new Plugin(model);

		return Plugin.destroy({ transacting: transaction });
	};

	module.exports = classDef;
})();