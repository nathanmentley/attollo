(function () {
	var classDef = function () {};

	var urlendpoint = '/Plugins';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth(null), function(request, response) {
			response.setHeader('Content-Type', 'application/json');

			Attollo.Services.Plugin.GetPlugins(request.AuthContext)
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
						message: err.message,
						stack: err.stack
					}
				});
			});
		});

		app.post(urlendpoint, auth(null), function(request, response) {
			response.setHeader('Content-Type', 'application/json');

			Attollo.Services.Plugin.AddPlugin(request.AuthContext, request.body.pluginDefCode)
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
						message: err.message,
						stack: err.stack
					}
				});
			});
		});

		app.delete(urlendpoint, auth(null), function(request, response) {
			response.setHeader('Content-Type', 'application/json');

			Attollo.Services.Plugin.DeletePlugin(request.AuthContext, { id: request.query.pluginId })
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
						message: err.message,
						stack: err.stack
					}
				});
			});
		});
	};
	
	module.exports = new classDef();
})();