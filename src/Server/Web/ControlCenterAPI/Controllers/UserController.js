(function () {
	import PermissionDefCodes from '../../../../Platform/Constants/PermissionDefCodes';

	var classDef = function () {};

	var urlendpoint = '/Users';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(PermissionDefCodes.ViewUsers),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.User.GetUsers(request.AuthContext)
				)
			}
		);
		controllerContext.App.post(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.User.AddUser(request.AuthContext, request.body.username, request.body.password)
				)
			}
		);
		controllerContext.App.put(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.User.UpdateUser(request.AuthContext, request.body.user)
				)
			}
		);
		controllerContext.App.delete(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.User.DeleteUser(request.AuthContext, { id: request.query.userId })
				)
			}
		);
	};
	
	module.exports = new classDef();
})();