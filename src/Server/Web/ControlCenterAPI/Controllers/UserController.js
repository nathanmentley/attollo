(function () {
	var classDef = function () {};

	var urlendpoint = '/Users';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth('Login'), function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.User.GetUsers(request.AuthContext)
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

		app.post(urlendpoint, auth('Login2'), function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.User.AddUser(request.AuthContext, request.body.username, request.body.password)
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
			
			Attollo.Services.User.UpdateUser(request.AuthContext, request.body.user)
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
			
			Attollo.Services.User.DeleteUser(request.AuthContext, { id: request.query.userId })
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