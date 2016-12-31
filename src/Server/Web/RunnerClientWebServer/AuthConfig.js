import constitute from 'constitute';

import Attollo from "../../Common/Attollo";

var attollo = constitute(Attollo);

export default function() {
	return function(req, res, next) {
		var originDomain = req.get('host').replace("http://", "");

		attollo.Services.Site.GetSite({}, originDomain)
		.then(function (sites) {
			var site = sites.first();
			
			attollo.Services.Site.GetCurrentSiteVersion({}, site)
			.then(function (siteVersions) {
				var siteVersion = siteVersions.first();

				if(site && siteVersion) {
					req.AuthContext = {
						ClientID: site.get('clientid'),
						UserName: '*SYSTEM|RunnerClientWebServer',
						SiteID: site.get('id'),
						SiteVersionID: siteVersion.get('id')
					};
					next();
				} else {
					res.statusCode = 403;
					res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
					res.end('Forbidden1');
				}
			})
			.catch(function (err) {
				res.statusCode = 403;
				res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
				res.end('Forbidden2');
			});
		})
		.catch(function(err) {
			res.statusCode = 403;
			res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
			res.end(JSON.stringify(err));
		});
	};
};