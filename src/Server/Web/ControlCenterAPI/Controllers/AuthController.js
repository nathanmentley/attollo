(function () {
	var jwt = require('jwt-simple');

	var classDef = function () {};

	var urlendpoint = '/Auth';

	classDef.prototype.Setup = function (app, express, auth) {
		app.post(urlendpoint, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.User.GetUser({}, request.body.username, request.body.password)
			.then(function (users) {
				var user = users.first();

				if(user) {
					var tokenData = { clientid: user.get('clientid'), name: user.get('name'), env: Attollo.Utils.Config.Environment };
					
					response.json({
						error: false,
						data: {
							token: jwt.encode(tokenData, Attollo.Utils.Config.JwtSecret)
						}
					});
				}else{
					response.json({
						error: true,
						data: {
							message: 'Invalid username or password.'
						}
					});
				}
			})
			.catch(function(err) {
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