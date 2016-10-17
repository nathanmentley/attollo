(function() {;
	module.exports = function(req, res, next) {
		var originDomain = req.get('origin').replace("http://", "");

		Attollo.Services.Site.GetSite({}, originDomain)
		.then(function (sites) {
			var site = sites.first();
			if(site) {
				req.AuthContext = {
					ClientID: site.get('clientid'),
					SiteID: site.get('id')
				};

				next();
			} else {
				res.statusCode = 403;
				res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
				res.end('Forbidden');
			}
		})
		.catch(function(err) {
			res.statusCode = 403;
			res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
			res.end('Forbidden');
		});
	};
})(); 