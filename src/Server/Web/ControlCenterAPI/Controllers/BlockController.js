(function () {
	var classDef = function () {};

	var urlendpoint = '/Blocks';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Block.GetBlocks(request.AuthContext, request.query.blockContainerId)
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
			
			Attollo.Services.Block.AddBlock(request.AuthContext, request.body.blockContainerId, request.body.areaCode, request.body.code)
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

		app.put(urlendpoint, auth, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Block.UpdateBlock(request.AuthContext, request.body.block)
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
			
			Attollo.Services.Block.DeleteBlock(request.AuthContext, { id: request.query.blockId })
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