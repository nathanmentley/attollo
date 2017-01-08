import { Dependencies } from 'constitute';

import SiteVersionStatusCodes from '../../../Platform/Constants/SiteVersionStatusCodes';

import BaseService from '../BaseService';

import ServiceContext from "../ServiceContext";

import ThemeService from './ThemeService';

@Dependencies(
    ServiceContext,
    ThemeService
)
export default class SiteService extends BaseService {
    constructor(
        serviceContext,
        themeService
    ) {
        super(serviceContext);

        this._ThemeService = themeService;
    }

    //SiteVersion

	GetCurrentSiteVersion(authContext, site){
		return this.Context.Handlers.Site.GetCurrentSiteVersion(authContext, site);
	};

    GetSiteVersions(authContext, siteId){
        return this.Context.Handlers.Site.GetSiteVersions(authContext, siteId);
    };

    GetSiteVersion(authContext, siteVersionId){
        return this.Context.Handlers.Site.GetSiteVersion(authContext, siteVersionId);
    };
	
	//Site

	GetSite(authContext, domain){
		return this.Context.Handlers.Site.GetSite(authContext, domain);
	};

	GetSites(authContext){
		return this.Context.Handlers.Site.GetSites(authContext);
	};
	
	AddSite(authContext, themeCode){
		var self = this;

		return new Promise(function(resolve, reject) {
			self._ThemeService.GetTheme(authContext, themeCode)
			.then((theme) => {
				self.GetSiteVersionStatus(authContext, SiteVersionStatusCodes.Published)
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

	UpdateSite(authContext, model){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Site.UpdateSite(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	DeleteSite(authContext, model){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.Site.DeleteSite(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//site version provision

    ExportSiteVersion(authContext, id) {
        return this.Context.Handlers.Site.ExportSiteVersion(authContext, id);
    };

    ImportSiteVersion(authContext, data, siteId) {
    	return new Promise((resolve, reject) => {
            this.GetSiteVersionStatus(authContext, SiteVersionStatusCodes.Editing)
                .then((status) => {
                    this.Context.DBTransaction((transaction) => {
                        this.Context.Handlers.Site.ImportSiteVersion(authContext, transaction, data, siteId, status.first().get('id'))
                            .then((result) => {
                                transaction.commit(result);
                                resolve(result);
                            }).catch((err) => {
								transaction.rollback(err);
								reject(err);
							});
                    });
                })
                .catch((err) => {
                    reject(err);
                });
		});
    };

    CloneSiteVersion(authContext, id, siteId) {
        return new Promise((resolve, reject) => {
            this.GetSiteVersionStatus(authContext, SiteVersionStatusCodes.Editing)
                .then((status) => {
                    this.Context.DBTransaction((transaction) => {
                        this.Context.Handlers.Site.CloneSiteVersion(authContext, transaction, id, siteId, status.first().get('id'))
                            .then((result) => {
                                transaction.commit(result);
                                resolve(result);
                            }).catch((err) => {
                            transaction.rollback(err);
                            reject(err);
                        });
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    PublishSiteVersion(authContext, id) {
        return new Promise((resolve, reject) => {
        	this.GetSiteVersion(authContext, id)
				.then((siteVersion) => {
                    this.GetSiteVersionStatus(authContext, SiteVersionStatusCodes.Editing)
                        .then((editingStatus) => {
                            this.GetSiteVersionStatus(authContext, SiteVersionStatusCodes.Published)
                                .then((publishedStatus) => {
                                    var editingStatusId = editingStatus.first().get('id');
                                    var publishedStatusId = publishedStatus.first().get('id');

                                    this.Context.Handlers.Site.GetSiteVersionsByStatusId(authContext, siteVersion.get('siteid'), publishedStatusId)
										.then((publishedVersions) => {
                                            this.Context.DBTransaction((transaction) => {
                                            	var promises = [];

                                                publishedVersions.toJSON().forEach((publishedVersion) => {
                                                    publishedVersion.current = false;
                                                    publishedVersion.siteversionstatusid = editingStatusId;

                                                	promises.push(
                                                        this.Context.Handlers.Site.UpdateSiteVersion(authContext, transaction, publishedVersion)
													);
												});

                                            	var newPublishedModel = siteVersion.toJSON();
                                                newPublishedModel.current = true;
                                                newPublishedModel.siteversionstatusid = publishedStatusId;

                                                promises.push(
                                                    this.Context.Handlers.Site.UpdateSiteVersion(authContext, transaction, newPublishedModel)
												);

                                                Promise.all(promises)
													.then(() => {
														transaction.commit(siteVersion);
													}).catch((err) => {
														transaction.rollback(err);
													});
                                            })
                                                .then(() => {
                                                    resolve(siteVersion);
                                                })
                                                .catch((err) => {
                                                    reject(err);
                                                });
										})
                                        .catch((err) => {
                                            reject(err);
                                        });
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        })
                        .catch((err) => {
                            reject(err);
                        });
				})
                .catch((err) => {
                    reject(err);
                });
        });
	}

    //SiteVersionStatus

	GetSiteVersionStatus(authContext, code){
		return this.Context.Handlers.Site.GetSiteVersionStatus(authContext, code);
	};

	GetSiteVersionStatuses(authContext){
		return this.Context.Handlers.Site.GetSiteVersionStatuses(authContext);
	};

	AddSiteVersionStatus(authContext, name, code){
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