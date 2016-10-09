(function () {
	var classDef = function () {};

	var urlendpoint = '/Pages';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Page.GetPages(request.AuthContext)
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
			
			Attollo.Services.Page.AddPage(
				request.AuthContext,
				{
					firstname: request.body.FirstName,
					lastname: request.body.LastName,
					companyname: request.body.CompanyName,
					email: request.body.Email,
					phone: request.body.Phone,
					info: request.body.Info
				}
			)
			.then(function (collection) {
				response.json({
					error: false,
					data: {
						message: "page created."
					}
				});
			})
			.catch(function() {
				response.status(500).json({
					error: true,
					data: {
						message: "could not create page."
					}
				});
			});
		});
	};
	
	module.exports = new classDef();
})();