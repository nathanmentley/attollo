(function () {
	const { VM } = require('vm2');

	var Context;
	var ServiceName;
	var classDef = function (serviceContext, name) {
		Context = serviceContext;
		ServiceName = name;
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

	//PluginDefLogic

	classDef.prototype.GetPluginDefPreLogics = function (authContext, pluginDefLogicDefCode) {
		if(authContext){
			var vm = new VM({
				sandbox: {
					Attollo: Attollo.GetPluginContext(authContext)
				}
			});

			return new Promise((resolve, reject) => {
				resolve([
					vm.run('											\
						new Promise((resolve, reject) => {				\
							Attollo.TestMethod().then(() => {			\
								resolve(); 								\
							}).catch((err) => {							\
								reject(err);							\
							});											\
						})												\
						'
					)
				]);
			});
		}else{
			return new Promise((resolve, reject) => { 
				resolve(
					[
						new Promise((resolve2, reject2) => {
							resolve2();
						}) 
					]
				);
			});
		}
	}

	classDef.prototype.GetPluginDefPostLogics = function (authContext, pluginDefLogicDefCode, data) {
		if(authContext){
			var logics = [
				'																\
					new Promise((resolve, reject) => {							\
						Attollo.TestMethod().then(() => {						\
							resolve(Data); 										\
						}).catch((err) => {										\
							reject(err);										\
						});														\
					})															\
				'
			];

			if(logics.length) {
				var pluginContext = Attollo.GetPluginContext(authContext);
				return new Promise((resolve, reject) => {
					var processLogic = (logicArray, currentData) => {
						if(logicArray.length) {
							var logic = logicArray.pop();
							var vm = new VM({
								sandbox: {
									Attollo: pluginContext,
									Data: currentData
								}
							});

							vm.run(logic)
							.then((newData) => {
								processLogic(logicArray, newData);
							})
							.catch((err) => {
								reject(err);
							});
						} else {
							resolve(currentData);
						}
					};

					processLogic(logics, data);
				});
			}else{
				return new Promise((resolve, reject) => { 
					resolve(data);
				});
			}
		}else{
			return new Promise((resolve, reject) => { 
				resolve(data);
			});
		}
	}

	module.exports = classDef;
})();
