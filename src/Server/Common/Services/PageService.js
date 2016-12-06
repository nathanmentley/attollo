import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class BlockService extends BaseService {
	static GetPageDefs(authContext){
		return this.Context.Handlers.Page.GetPageDefs(authContext);
	};

	static GetPageDef(authContext, code){
		return this.Context.Handlers.Page.GetPageDef(authContext, code);
	};
	
	static AddPageDef(authContext, pluginDefCode, pageDef){
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
	
	static GetPages(authContext, siteVersionId){
		return this.Context.Handlers.Page.GetPages(authContext, siteVersionId);
	};
	
	static AddPage(authContext, page){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Page.AddPage(authContext, transaction, page)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	static UpdatePage(authContext, model){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Page.UpdatePage(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	static DeletePage(authContext, model){
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