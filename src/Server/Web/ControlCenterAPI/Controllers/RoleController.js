(function () {
	var classDef = function () {};

	var urlendpoint = '/Roles';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.User.GetRoles(request.AuthContext)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();