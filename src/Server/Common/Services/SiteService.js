import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class SiteService extends BaseService {
	//SiteVersion

	static GetCurrentSiteVersion(authContext, site){
		return this.Context.Handlers.Site.GetCurrentSiteVersion(authContext, site);
	};

	static GetSiteVersions(authContext, siteId){
		return this.Context.Handlers.Site.GetSiteVersions(authContext, siteId);
	};
	
	//Site

	static GetSite(authContext, domain){
		return this.Context.Handlers.Site.GetSite(authContext, domain);
	};

	static GetSites(authContext){
		return this.Context.Handlers.Site.GetSites(authContext);
	};
	
	static AddSite(authContext, themeCode){
		var self = this;

		return new Promise(function(resolve, reject) {
			Attollo.Services.Theme.GetTheme(authContext, themeCode)
			.then((theme) => {
				self.GetSiteVersionStatus(authContext, "Published")
				.then((status) => {
					self.Context.DBTransaction((transaction) => {
						self.Context.Handlers.Site.AddSite(authContext, transaction, theme.get('id'))
						.then((site) => {
							self.Context.Handlers.Site.AddSiteVersion(authContext, transaction, site.get('id'), status.first().get('id'))
							.then(() => {
								transaction.commit(site);
							}).catch((err) => {
								transaction.rollback(err);
							});
						}).catch((err) => {
							transaction.rollback(err);
						});
					})
					.then((site) => {
						resolve(site);
					})
					.catch((err) => {
						reject({ message: err.message });
					});
				}).catch((err) => {
					reject({ message: err.message });
				});
			}).catch((err) => {
				reject({ message: err.message });
			});
		});
	};

	static UpdateSite(authContext, model){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Site.UpdateSite(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	static DeleteSite(authContext, model){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Site.DeleteSite(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//SiteVersionStatus

	static GetSiteVersionStatus(authContext, code){
		return this.Context.Handlers.Site.GetSiteVersionStatus(authContext, code);
	};

	static GetSiteVersionStatuses(authContext){
		return this.Context.Handlers.Site.GetSiteVersionStatuses(authContext);
	};

	static AddSiteVersionStatus(authContext, name, code){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Site.AddSiteVersionStatus(authContext, transaction, name, code)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
}