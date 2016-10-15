(function () {
	var classDef = function () {};

	var urlendpoint = '/Blocks';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Block.GetBlocks(request.AuthContext, request.query.pageId)
			.then(function (collection) {
				response.json({
					error: false,
					data: collection.toJSON()
				});
			})
			.catch(function (err) {
				Attollo.Utils.Log.Info(JSON.stringify(err));

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