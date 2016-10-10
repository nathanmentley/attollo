(function () {
	var classDef = function () {};

	var urlendpoint = '/Auth';

	classDef.prototype.Setup = function (app, express, auth) {
		app.post(urlendpoint, auth, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.User.GetUser({}, request.body.username, request.body.password)
			.then(function (user) {
				response.json({
					error: false,
					data: {
						token: "token"
					}
				});
			})
			.catch(function() {
				response.status(500).json({
					error: true,
					data: {
						message: "Invalid login."
					}
				});
			});
		});
	};
	
	module.exports = new classDef();
})();