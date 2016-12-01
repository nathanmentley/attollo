(function () {
	var classDef = function () {};

	var urlendpoint = '/DataTypeFieldTypes';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.DataType.GetDataTypeFieldTypes(request.AuthContext)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();