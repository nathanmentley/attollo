import { VM } from 'vm2';

import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class PluginService extends BaseService {
	//PluginDefLogicDef
	
	static AddPluginDefLogicDef(authContext, model){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Plugin.AddPluginDefLogicDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//PluginDefLogicTarget
	
	static AddPluginDefLogicTarget(authContext, model){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Plugin.AddPluginDefLogicTarget(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//PluginDef
	
	static GetPluginDefs(authContext){
		return this.Context.Handlers.Plugin.GetPluginDefs(authContext);
	};

	static GetPluginDef(authContext, code){
		return this.Context.Handlers.Plugin.GetPluginDef(authContext, code);
	};
	
	static AddPluginDef(authContext, model){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Plugin.AddPluginDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
	
	//Plugin

	static GetPlugins(authContext){
		return this.Context.Handlers.Plugin.GetPlugins(authContext);
	};
	
	static AddPlugin(authContext, code){
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetPluginDef(authContext, code)
			.then((pluginDef) => {
				self.Context.DBTransaction((transaction) => {
					this.Context.Handlers.Plugin.AddPlugin(authContext, transaction, { plugindefid: pluginDef.first().get('id'), clientid: authContext.ClientID })
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

	static UpdatePlugin(authContext, model){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Plugin.UpdatePlugin(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	static DeletePlugin(authContext, model){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Plugin.DeletePlugin(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//PluginDefLogic

	static GetPluginDefPreLogics(authContext, pluginDefLogicDefCode) {
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

	static GetPluginDefPostLogics(authContext, pluginDefLogicDefCode, data) {
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
}