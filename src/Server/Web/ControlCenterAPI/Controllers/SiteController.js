(function () {
	var classDef = function () {};

	var urlendpoint = '/Sites';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth(null), function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Site.GetSites(request.AuthContext)
			.then(function (collection) {
				response.json({
					error: false,
					data: collection.toJSON()
				});
			})
			.catch(function (err) {
				response.status(500).json({
					error: true,
					data: {
						message: err.message
					}
				});
			});
		});

		app.post(urlendpoint, auth(null), function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Site.AddSite(request.AuthContext)
			.then(function() {
				response.json({
					error: false
				});
			})
			.catch(function (err) {
				response.status(500).json({
					error: true,
					data: {
						message: err.message
					}
				});
			});
		});

		app.put(urlendpoint, auth(null), function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Site.UpdateSite(request.AuthContext, request.body.site)
			.then(function() {
				response.json({
					error: false
				});
			})
			.catch(function (err) {
				response.status(500).json({
					error: true,
					data: {
						message: err.message
					}
				});
			});
		});

		app.delete(urlendpoint, auth(null), function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Site.DeleteSite(request.AuthContext, { id: request.query.siteId })
			.then(function() {
				response.json({
					error: false
				});
			})
			.catch(function (err) {
				response.status(500).json({
					error: true,
					data: {
						message: err.message
					}
				});
			});
		});
	};
	
	module.exports = new classDef();
})();