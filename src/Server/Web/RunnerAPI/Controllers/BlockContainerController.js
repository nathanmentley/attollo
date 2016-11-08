(function () {
	var classDef = function () {};

	var urlendpoint = '/BlockContainers';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth(null), function(request, response) {
			response.setHeader('Content-Type', 'application/json');

			Attollo.Services.Block.GetBlockContainers(request.AuthContext, request.query.pageId)
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
	};
	
	module.exports = new classDef();
})();