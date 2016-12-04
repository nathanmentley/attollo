import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class BlockService extends BaseService {
	static GetPageDefs(authContext){
		return Context.Handlers.Page.GetPageDefs(authContext);
	};

	static GetPageDef(authContext, code){
		return Context.Handlers.Page.GetPageDef(authContext, code);
	};
	
	static AddPageDef(authContext, pluginDefCode, pageDef){
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
	
	static GetPages(authContext, siteVersionId){
		return Context.Handlers.Page.GetPages(authContext, siteVersionId);
	};
	
	static AddPage(authContext, page){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Page.AddPage(authContext, transaction, page)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	static UpdatePage(authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Page.UpdatePage(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	static DeletePage(authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.Page.DeletePage(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
}