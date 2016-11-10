(function() {;
	module.exports = function(permission) {
		return function(req, res, next) {
			var originDomain = req.get('origin').replace("http://", "");

			Attollo.Services.Site.GetSite({}, originDomain)
			.then(function (sites) {
				var site = sites.first();

				Attollo.Services.Site.GetCurrentSiteVersion({}, site)
				.then(function (siteVersions) {
					var siteVersion = siteVersions.first();

					if(site && siteVersion) {
						req.AuthContext = {
							ClientID: site.get('clientid'),
							SiteID: site.get('id'),
							SiteVersionID: siteVersion.get('id')
						};

						next();
					} else {
						res.statusCode = 403;
						res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
						res.end('Forbidden');
					}
				})
				.catch(function (err) {
					res.statusCode = 403;
					res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
					res.end('Forbidden');
				});
			})
			.catch(function(err) {
				res.statusCode = 403;
				res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
				res.end('Forbidden');
			});
		};
	};
})(); 