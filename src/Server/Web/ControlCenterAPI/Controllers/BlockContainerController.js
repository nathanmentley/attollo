(function () {
	var classDef = function () {};

	var urlendpoint = '/BlockContainers';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth, function(request, response) {
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

		app.post(urlendpoint, auth, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Block.AddBlockContainers(request.AuthContext, request.body.pageId, request.body.code)
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

		app.put(urlendpoint, auth, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Block.UpdateBlockContainer(request.AuthContext, request.body.blockContainer)
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

		app.delete(urlendpoint, auth, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Block.DeleteBlockContainer(request.AuthContext, { id: request.query.blockContainerId })
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