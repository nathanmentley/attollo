(function () {
	var classDef = function () {};

	var urlendpoint = '/DataTypes';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.DataType.GetDataTypes(request.AuthContext, request.query.dataTypeDefId, request.query.filter)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();