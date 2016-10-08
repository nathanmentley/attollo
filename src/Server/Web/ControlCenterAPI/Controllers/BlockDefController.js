(function () {
	var classDef = function () {};

	var urlendpoint = '/BlockDefs';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.BlockDef.GetBlockDefs(
				function (collection) {
					response.json({
						error: false,
						data: collection.toJSON()
					});
				},
				function (err) {
					response.status(500).json({
						error: true,
						data: {
							message: err.message
						}
					});
				}
			);
		});
	};
	
	module.exports = new classDef();
})();