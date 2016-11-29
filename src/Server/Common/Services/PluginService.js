(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetPluginDefs = function (authContext){
		return Context.Handlers.Plugin.GetPluginDefs(authContext);
	};

	classDef.prototype.GetPluginDef = function (authContext, code){
		return Context.Handlers.Plugin.GetPluginDef(authContext, code);
	};
	
	classDef.prototype.AddPluginDef = function (authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Plugin.AddPluginDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
	
	classDef.prototype.GetPlugins = function (authContext){
		return Context.Handlers.Plugin.GetPlugins(authContext);
	};
	
	classDef.prototype.AddPlugin = function (authContext, code){
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetPluginDef(authContext, code)
			.then((pluginDef) => {
				Attollo.Utils.Log.Info(code + " = " + JSON.stringify(pluginDef));

				Context.DBTransaction((transaction) => {
					Context.Handlers.Plugin.AddPlugin(authContext, transaction, { plugindefid: pluginDef.first().get('id'), clientid: authContext.ClientID })
					.then((result) => {
						transaction.commit(result);
					})
					.catch((err) => {
						transaction.rollback(err);
					});
				})
				.then((result) => {
					resolve(result);
				})
				.catch((err) => {
					reject(err);
				})
			})
			.catch((err) => {
				reject(err);
			})
		});
	};

	classDef.prototype.UpdatePlugin = function (authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Plugin.UpdatePlugin(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	classDef.prototype.DeletePlugin = function (authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Plugin.DeletePlugin(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	module.exports = classDef;
})();
