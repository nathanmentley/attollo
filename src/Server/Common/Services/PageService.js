(function () {
	var Context;
	var ServiceName;
	var classDef = function (serviceContext, name) {
		Context = serviceContext;
		ServiceName = name;
	};
	
	classDef.prototype.GetPageDefs = function (authContext){
		return Context.Handlers.Page.GetPageDefs(authContext);
	};

	classDef.prototype.GetPageDef = function (authContext, code){
		return Context.Handlers.Page.GetPageDef(authContext, code);
	};
	
	classDef.prototype.AddPageDef = function (authContext, pluginDefCode, pageDef){
		return new Promise((resolve, reject) => {
			Attollo.Services.Plugin.GetPluginDef(authContext, pluginDefCode)
			.then((pluginDef) => {
				Context.DBTransaction((transaction) => {
					pageDef.plugindefid = pluginDef.first().get('id');

					Context.Handlers.Page.AddPageDef(authContext, transaction, pageDef)
					.then((result) => {
						transaction.commit(result);
					}).catch((err) => {
						transaction.rollback(err);
					});
				})
				.then((result) => {
					resolve(result);
				})
				.catch((err) => {
					reject(err);
				});
			})
			.catch((err) => {
				reject(err);
			});
		});
	};
	
	classDef.prototype.GetPages = function (authContext, siteVersionId){
		return Context.Handlers.Page.GetPages(authContext, siteVersionId);
	};
	
	classDef.prototype.AddPage = function (authContext, page){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Page.AddPage(authContext, transaction, page)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	classDef.prototype.UpdatePage = function (authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Page.UpdatePage(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	classDef.prototype.DeletePage = function (authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Page.DeletePage(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	module.exports = classDef;
})();
