(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetPageDefs = function (authContext){
		return Context.Handlers.Page.GetPageDefs(authContext);
	};

	classDef.prototype.GetPageDef = function (authContext, code){
		return Context.Handlers.Page.GetPageDef(authContext, code);
	};
	
	classDef.prototype.AddPageDef = function (authContext, pageDef){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Page.AddPageDef(authContext, transaction, pageDef)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
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
