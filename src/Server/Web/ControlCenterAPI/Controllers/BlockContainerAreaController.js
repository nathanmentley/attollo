(function () {
	var classDef = function () {};

	var urlendpoint = '/BlockContainerAreas';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Block.GetBlockContainerArea(request.AuthContext, request.query.blockContainerId, request.query.areaCode)
			.then(function (areas) {
				response.json({
					error: false,
					data: areas.first()
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