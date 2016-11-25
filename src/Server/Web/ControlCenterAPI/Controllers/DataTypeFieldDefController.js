(function () {
	var classDef = function () {};

	var urlendpoint = '/DataTypeFieldDefs';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth(null), function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.DataType.GetDataTypeFieldDefs(request.AuthContext, request.query.dataTypeDefId)
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
			
			Attollo.Services.DataType.AddDataTypeFieldDef(request.AuthContext, request.body.dataTypeFieldDef)
			.then(function() {
				response.json({
					error: false
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

		app.put(urlendpoint, auth(null), function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.DataType.UpdateDataTypeFieldDef(request.AuthContext, request.body.dataTypeFieldDef)
			.then(function() {
				response.json({
					error: false
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
			
			Attollo.Services.DataType.DeleteDataTypeFieldDef(request.AuthContext, { id: request.query.dataTypeFieldDefId })
			.then(function() {
				response.json({
					error: false
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