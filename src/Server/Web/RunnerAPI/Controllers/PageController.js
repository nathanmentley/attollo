(function () {
	var classDef = function () {};

	var urlendpoint = '/Pages';

	classDef.prototype.Setup = function (app, express, auth) {
		app.get(urlendpoint, auth, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Page.GetPages(
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
		
		app.post(urlendpoint, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.Page.AddPage(
				{
					firstname: request.body.FirstName,
					lastname: request.body.LastName,
					companyname: request.body.CompanyName,
					email: request.body.Email,
					phone: request.body.Phone,
					info: request.body.Info
				},
				function (collection) {
					response.json({
						error: false,
						data: {
							message: "page created."
						}
					});
				},
				function() {
					response.status(500).json({
						error: true,
						data: {
							message: "could not create page."
						}
					});
				}
			);
		});
	};
	
	module.exports = new classDef();
})();