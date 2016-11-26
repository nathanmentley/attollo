(function () {
	var classDef = function () {};

	var urlendpoint = '/DataTypeFieldTypes';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth(null), function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.DataType.GetDataTypeFieldTypes(request.AuthContext)
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