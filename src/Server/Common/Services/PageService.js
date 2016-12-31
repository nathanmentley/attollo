import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class PageService extends BaseService {
	GetPageDefs(authContext){
		return this.Context.Handlers.Page.GetPageDefs(authContext);
	};

	GetPageDef(authContext, code){
		return this.Context.Handlers.Page.GetPageDef(authContext, code);
	};
	
	AddPageDef(authContext, pluginDefCode, pageDef){
		return new Promise((resolve, reject) => {
			Attollo.Services.Plugin.GetPluginDef(authContext, pluginDefCode)
			.then((pluginDef) => {
				this.Context.DBTransaction((transaction) => {
					pageDef.plugindefid = pluginDef.first().get('id');

					this.Context.Handlers.Page.AddPageDef(authContext, transaction, pageDef)
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
	
	GetPages(authContext, siteVersionId){
		return this.Context.Handlers.Page.GetPages(authContext, siteVersionId);
	};
	
	AddPage(authContext, page){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Page.AddPage(authContext, transaction, page)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	UpdatePage(authContext, model){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Page.UpdatePage(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	DeletePage(authContext, model){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Page.DeletePage(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
}